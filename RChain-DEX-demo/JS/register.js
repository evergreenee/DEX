document.addEventListener("DOMContentLoaded", () => {
    let username = document.getElementById('username')
    let publicKey = document.getElementById('public-key')

    document.getElementById('register').addEventListener('click', register)
    document.getElementById('back').addEventListener('click', Login)

     function register(){
        if (username.value === "" || publicKey.value === ""){
            console.log("Username and PublicKey are required. No user Registered.");
            return
        }

        let body = {
            usern: username.value,
            pk: publicKey.value,
        }

        makePost('/register', body)
            .then(data => {
            console.log(data)
        })

        username.value = ""
        publicKey.value = ""
        alert("注册成功");
     }


     function Login() {
        window.location.href = '/Login';
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


})