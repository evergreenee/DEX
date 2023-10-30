"use strict"

const express = require('express');
const bodyParser = require('body-parser');
const rho_deploy = require('./JS/deploy.js')

var host   = process.argv[2] ? process.argv[2] : "localhost"
var port   = process.argv[3] ? process.argv[3] : 40401
var uiPort = process.argv[4] ? process.argv[4] : 8080

var app = express()
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

app.listen(uiPort, () => {
  console.log("Dapp server started.")
  console.log(`Connected to RNode at ${host}:${port}.`)
  console.log(`started on ${uiPort}`)
})

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/public/index.html');
});

//注册
app.post('/register', (req, res) => {
    let rho_code = `@"register"!("${req.body.usern}", "${req.body.pk}")`;

    console.log("registered");

      rho_deploy.func_deploy(rho_code, 2).then(
        (ret) => {
          res.end("\"" + ret + "\"");
        }
      );
});
