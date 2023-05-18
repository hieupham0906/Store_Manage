// console.log("product")
// var updateBtns = document.getElementsByClassName('update-cart')
// for(i=0; i < updateBtns.length; i++){
//     updateBtns[i].addEventListener('click', function(){
//         var proId = this.dataset.product
//         var action = this.dataset.action
//         console.log('prid: ' + proId + ' action: ' + action)
//     })
// }

// function updateUserOrder(proId, action){
//     console.log('user logged in, success add')
//     var url = '/update_item/'
//     fetch(url,{
//         method:'POST',
//         headers:{
//             'Content-Type' : 'application/json',
//         },
//         body: JSON.stringify({'proId' : proId , ' action' : action})
//     })
//     .then((response) =>{
//         response.json()
//     })
//     .then((data) =>{
//         console.log('data', data)
//     })
// }