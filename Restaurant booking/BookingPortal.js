var reqObj = {} ;

function myValue (e){
    reqObj.time = e;
}
function myFun (f){
    reqObj.table = f;
}
function myFav(g){
    reqObj.suittime = g;
}
function bookAlert(){
    alert('Congratulation! You have Booked ' +  reqObj.table +  ' for ' +  reqObj.suittime +  ' at ' +  reqObj.time +'. '
    + 'Come and Enjoy the Food.' + ' ' + 'Thank you!');
}