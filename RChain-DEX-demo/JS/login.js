//const rchainToolkit = require('@fabcotech/rchain-toolkit');

document.addEventListener("DOMContentLoaded", () => {
    let privateKey = document.getElementById('private-key')
    let global_str = document.getElementById('global_str');

    document.getElementById('login').addEventListener('click', login)
    document.getElementById('back').addEventListener('click', back)

    function login(){
       if(privateKey.value === ""){
           console.log("Private Key Required");
       }

       let body = {
           //PUBLIC_KEY: rchainToolkit.utils.publicKeyFromPrivateKey(privateKey.value),
           privateKey: privateKey.value,
       }
       makePost('/login', body)
           .then(data => {
           console.log(data.message)
       })
       privateKey.value = ""
    }

    function makePost(route, body){

        let request = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(body)
        }
        return fetch(route, request)
        .then(res => {return res.json()})
    }

    function back() {
        window.location.href = '/';
    }
})