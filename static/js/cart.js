console.log("ahiih")
var updateBtns = document.getElementsByClassName('update-cart')
for(i=0; i < updateBtns.length; i++){
    updateBtns[i].addEventListener('click', function(){
        var proId = this.dataset.product
        var action = this.dataset.action
        console.log('prid: ' + proId + ' action: ' + action)
    })
}