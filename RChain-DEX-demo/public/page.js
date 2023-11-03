document.addEventListener("DOMContentLoaded", () => {
    let payNum = document.getElementById('payNum')
    let getNum = document.getElementById('getNum')

    document.getElementById('connect').addEventListener('click', connect)
    document.getElementById('choosePayCoin').addEventListener('click', choosePayCoin)
    document.getElementById('chooseGetCoin').addEventListener('click', chooseGetCoin)

     function connect(){
        window.location.href = '/Login';
     }

     function choosePayCoin(){

     }

     function chooseGetCoin(){

     }

//     function makePost(route, body){
//
//         let request = {
//            method: 'POST',
//            headers: {
//               'Accept': 'application/json',
//               'Content-type': 'application/json',
//            },
//                body: JSON.stringify(body)
//         }
//            return fetch(route, request)
//            .then(res => {return res.json()})
//     }


})