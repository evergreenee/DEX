const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const rchainToolkit = require('@fabcotech/rchain-toolkit');
const rchainToolkit_grpc = require('@fabcotech/rchain-toolkit/dist/grpc.js');
const fs = require('fs');

const PRIVATE_KEY = '28a5c9ac133b4449ca38e9bdf7cacdce31079ef6b3ac2f0a080af83ecff98b36';
//const PRIVATE_KEY = '4742cbf393e6b11b563f2afffedb9f4e7f7f688816813977f6fc92bf4d8f1c3d';
const PUBLIC_KEY = rchainToolkit.utils.publicKeyFromPrivateKey(PRIVATE_KEY);
//const READ_ONLY_HOST = 'http://localhost:40403';
const READ_ONLY_HOST = 'http://192.168.59.133:40403';
//const VALIDATOR_HOST = 'http://localhost:40403';
const VALIDATOR_HOST = 'http://192.168.59.133:40403';
const SHARD_ID = 'root';

const func_deploy = async (rho_code_, order_) => {
    const _timestamp = new Date().valueOf();
    const grpcClient = await rchainToolkit_grpc.getGrpcProposeClient(
        //"localhost:40402",
        "192.168.59.133:40402",
        grpc,
        protoLoader
    );
    const pd = await rchainToolkit.http.prepareDeploy(
        READ_ONLY_HOST,
        {
            deployer: PUBLIC_KEY,
            timestamp: _timestamp,
            nameQty: order_ + 1
        }
    );
    console.log('Prepare deploy...');
    console.log(pd + '\n');

    const _validAfterBlockNumber = await rchainToolkit.http.validAfterBlockNumber(
        //"http://localhost:40403"
        "http://192.168.59.133:40403"
    );
    const deployOptions = rchainToolkit.utils.getDeployOptions(
    {
        timestamp: _timestamp,
        term: rho_code_,
        shardId: SHARD_ID,
        privateKey: PRIVATE_KEY,
        phloPrice: 1,
        phloLimit: 100000000,
        validAfterBlockNumber: _validAfterBlockNumber || -1
    }
    );
    let deployResponse;
    try {
        deployResponse = await rchainToolkit.http.deploy(
            //"http://localhost:40403",
            "http://192.168.59.133:40403",
            deployOptions
        );
    } catch (err) {
        console.log(err);
    }
    console.log('deployResponse:');
    console.log(deployResponse + '\n');

    let proposeResponse;
    try {
        proposeResponse = await rchainToolkit_grpc.propose({}, grpcClient);
    } catch (err) {
        console.log(err);
    }
        console.log('Propose Success!\n');

    await new Promise(resolve => setTimeout(resolve, 5000));
    let ret;

    if(order_ >= 0){
        const dataAtUnforgeableName = await rchainToolkit.http.dataAtName(
              READ_ONLY_HOST,
              {
                name: {
                  UnforgPrivate: { data: JSON.parse(pd).names[order_] }
                },
                depth: 1
              }
        );

        console.log('data-at-name response:');
        console.log(dataAtUnforgeableName + '\n');

//        if (dataAtUnforgeableName) {
//          const parsedData = JSON.parse(dataAtUnforgeableName);
//          if (parsedData && parsedData.exprs && parsedData.exprs.length > 0) {
//            const data_json = parsedData.exprs[0];
//            // 现在可以安全地访问 data_json 的属性
//          } else {
//            console.error("无法找到有效的 exprs 数据");
//            return;
//          }
//        } else {
//          console.error("dataAtUnforgeableName 为空或未定义");
//        }

        const data_json = JSON.parse(dataAtUnforgeableName).exprs[0];

        let data;

        if(data_json != null){
              data = rchainToolkit.utils.rhoValToJs(
                data_json.expr
              );
        } else {
              data = null;
        }

        console.log('data:');
        console.log(data  + '\n');

        ret = data;
        console.log('Deploy Finished!\n');

      } else {
        ret = null;
        console.log('Simple Deploy Finished!\n');
      }

      return ret;
};

const func_deploy_fromfile = async (rho_file_, order_) => {
  const rho_code = fs.readFileSync(rho_file_, 'utf8');
  return func_deploy(rho_code, order_);
};


module.exports = {
	func_deploy,
    func_deploy_fromfile
};