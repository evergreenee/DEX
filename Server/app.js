"use strict"
const rchainToolkit = require('@fabcotech/rchain-toolkit');
const rchainToolkit_rev = require('@fabcotech/rchain-toolkit/dist/utils/revAddressFromPublicKey.js');

const express = require('express');
const bodyParser = require('body-parser');
const rho_deploy = require('./JS/deploy.js')
const cors = require('cors');
const json = require('rollup-plugin-json');


var host = process.argv[2] ? process.argv[2] : "localhost"
var port = process.argv[3] ? process.argv[3] : 40401
var uiPort = process.argv[4] ? process.argv[4] : 8081

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname));

// 允许跨域访问
app.use(cors({
    // origin: 'http://localhost:3000',
    origin: '*',
}));


app.listen(uiPort, () => {
    console.log("Dapp server started.");
    console.log(`Connected to RNode at ${host}:${port}.`);
    console.log(`started on ${uiPort}`);
})

// api

// 测试
app.get('/api/getTest', (req, res) => {
    console.log("Got a get request");
    res.end("server: got GET request");
});

app.post('/api/login', (req, res) => {
    let combinedData = {};

    let PublicK = rchainToolkit.utils.publicKeyFromPrivateKey(`${req.body.privateKey}`);
    let addr = rchainToolkit_rev.revAddressFromPublicKey(PublicK);
    //第一次：查看REV余额并返回
    let rho_code = `new userCh, checkBalance, transfer, ret, checkBulletBalance, depositForBullet, checkNECBalance, depositForNEC in {
                        @{"rl_factory"}!(*checkBalance, *transfer, *checkBulletBalance, *depositForBullet, *checkNECBalance, *depositForNEC)
                        |
                        checkBalance!("${addr}", *ret)
                    }`;
    rho_deploy.func_deploy(rho_code, 3).then(
        (ret) => {
            combinedData.balance = ret;
            //第二次：查看Bullet余额并返回
            rho_code = `new userCh, checkBalance, transfer, ret, checkBulletBalance, depositForBullet, checkNECBalance, depositForNEC in {
                            @{"rl_factory"}!(*checkBalance, *transfer, *checkBulletBalance, *depositForBullet, *checkNECBalance, *depositForNEC)
                            |
                            checkBulletBalance!("${addr}", *ret)
                        }`;
            rho_deploy.func_deploy(rho_code, 3).then(
                (ret) => {
                    combinedData.bulletBalance = ret;
                    //第三次：查看NEC余额并返回
                    rho_code = `new userCh, checkBalance, transfer, ret, checkBulletBalance, depositForBullet, checkNECBalance, depositForNEC in {
                        @{"rl_factory"}!(*checkBalance, *transfer, *checkBulletBalance, *depositForBullet, *checkNECBalance, *depositForNEC)
                        |
                        checkNECBalance!("${addr}", *ret)
                    }`;

                    rho_deploy.func_deploy(rho_code, 3).then(
                        (ret) => {
                            combinedData.necBalance = ret;
        
                            combinedData.addr = addr; //REV地址
                            combinedData.publicKey = PublicK; //公钥
                            
                            res.send(JSON.stringify(combinedData));
        
                        }
                    );

                }
            );
        }
    );
});

var revAmount = 0;
var BulletAmount = 0;
var NECAmount = 0;

app.post('/api/trans', (req, res) => {
    var from = `${req.body.from}`
    var to = `${req.body.to}`;
    var amount = `${req.body.amount}`;

    revAmount += amount;
    BulletAmount = Math.floor((revAmount - 50) / 50);
    NECAmount = Math.floor((revAmount - 100) / 100);

    let rho_code = `new userCh, checkBalance, transfer, ret, checkBulletBalance, depositForBullet, checkNECBalance, depositForNEC in {
                        @{"rl_factory"}!(*checkBalance, *transfer, *checkBulletBalance, *depositForBullet, *checkNECBalance, *depositForNEC)
                        |
                        transfer!("${from}", "${to}", ${amount})
                     }`;
    rho_deploy.func_deploy(rho_code, -1).then(
        (ret) => {
            res.end("\"" + ret + "\"");
        }
    );
});


var REV2Bullet = 50;
var REV2NEC = 100;

app.post('/api/exchange', (req, res) => {
    var pay = `${req.body.pay}`;
    var get = `${req.body.get}`;
    var amount = `${req.body.amount}`;
    let rho_code;
    if (pay === "REV" && get === "Bullet") {
        rho_code = `new userCh, checkBalance, transfer, ret, checkBulletBalance, depositForBullet, checkNECBalance, depositForNEC in {
            @{"rl_factory"}!(*checkBalance, *transfer, *checkBulletBalance, *depositForBullet, *checkNECBalance, *depositForNEC)
            |
            depositForBullet!(${amount}, ${REV2Bullet})
         }`;

        revAmount -= amount;
        BulletAmount += Math.floor(amount / REV2Bullet);
        REV2Bullet = Math.floor((amount * BulletAmount) / (revAmount - amount));
    }
    if (pay === "REV" && get === "NEC"){
        rho_code = `new userCh, checkBalance, transfer, ret, checkBulletBalance, depositForBullet, checkNECBalance, depositForNEC in {
            @{"rl_factory"}!(*checkBalance, *transfer, *checkBulletBalance, *depositForBullet, *checkNECBalance, *depositForNEC)
            |
            depositForNEC!(${amount}, ${REV2NEC})
         }`;

         revAmount -= amount;
         NECAmount += Math.floor(amount / REV2NEC);
         REV2NEC = Math.floor((amount * NECAmount) / (revAmount - amount));
    }

    rho_deploy.func_deploy(rho_code, -1).then(
        (ret) => {
            res.end("\"" + ret + "\"");
        }
    );
});