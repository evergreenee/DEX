"use strict"
const rchainToolkit = require('@fabcotech/rchain-toolkit');

const express = require('express');
const bodyParser = require('body-parser');
const rho_deploy = require('./JS/deploy.js')

var host   = process.argv[2] ? process.argv[2] : "localhost"
var port   = process.argv[3] ? process.argv[3] : 40401
var uiPort = process.argv[4] ? process.argv[4] : 8080

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/html'));
app.use(express.static(__dirname + '/JS'));

app.listen(uiPort, () => {
  console.log("Dapp server started.");
  console.log(`Connected to RNode at ${host}:${port}.`);
  console.log(`started on ${uiPort}`);
})

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/Login', (req, res) => {
  res.sendFile(__dirname + '/html/login.html');
});

app.get('/Register', (req, res) => {
  res.sendFile(__dirname + '/html/register.html');
});


//注册
app.post('/register', (req, res) => {
    console.log("Register");
    let usern = `${req.body.usern}`;
    let pk = `${req.body.pk}`;
    let rho_code = `@"register"!("${usern}", "${pk}")`;

      rho_deploy.func_deploy(rho_code, 2).then(
        (ret) => {
          res.end("\"" + ret + "\"");
        }
      );
});

app.post('/login', (req, res) => {
    console.log("Login");
    let PublicK = rchainToolkit.utils.publicKeyFromPrivateKey(`${req.body.privateKey}`);

    let rho_code = `@"loginVerify"!("${PublicK}")`;
    rho_deploy.func_deploy(rho_code, 2).then(
            (ret) => {
              res.end("\"" + ret + "\"");
            }
          );
});