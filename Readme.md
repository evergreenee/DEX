# 目前进度

## 1 已实现功能

- 引入自定义代币 Bullet （ https://github.com/dimworm/Bullet/tree/master

- 在注册界面生成公私钥对，登录界面使用私钥登录

- 登录后显示当前登录者的公钥信息、REV 地址、REV 余额以及 Bullet 余额

- REV 转账功能，从当前登录账号中向指定地址转移 REV

  （目前只能从 28a5c9ac133b4449ca38e9bdf7cacdce31079ef6b3ac2f0a080af83ecff98b36 转出，使用其他账号转移会报错 Invalid Authkey）

- 与 Bullet 相关的功能正在开发，暂未可用

## 2 使用流程

- 在 frontend 与 server 的终端运行 `npm install` 安装依赖

- 在 server 终端下运行 `npm run rnode` 启动 Rnode

  若出现端口占用问题，运行 `sudo lsof -i:40400` 即可查看编号，再运行 `sudo kill 编号` 即可清除端口占用

- 在 server 另一终端下运行 `npm run deploy`

  /* **以下部分不用执行，暂未完成**

  结束后可以在 Rnode 终端中看到 “rho: id: xxxxxxxx”的内容

  然后将 server/dodeploy.js 内容改为：

  ```javascript
  const rho_deploy = require('./JS/deploy.js');
  
  //rho_deploy.func_deploy_fromfile('./rho/BulletVault.rho', -1);
  
  rho_deploy.func_deploy_fromfile('./rho/rl_factory.rho', -1);
  ```

  将 server/rho/rl_factory.rho 中 checkBulletBalance 合约内的 

  rl!(`rho:id:xq6f17q5gnykuqtqwwr5i3mznpp9gm9y1ixj1gpgfhgj3to8g8fotk`, *BulletVaultCh) 的第一个参数改为刚才记下的 “rho: id: xxxxxxxx”

  再次运行 `npm run deploy` 即可

  */

- 在 server 终端下运行 `npm run server` 启动服务器

- 然后在 frontend 终端下运行 `npm run dev` 进入前端即可正常运行（由于前端模块加载问题可能失败，等待一段时间即可）

## 3 后续

- 实现代币转换 REV -> Bullet （通过 BulletVault.rho 中的 deposit 实现）
- 实现多机器连接交易所
- 实现多代币间的自动做市商
