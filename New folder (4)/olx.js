


var main = document.getElementById('main');

var mainChild1 = document.createElement('div')
    mainDev1.setAttribute('class', 'mainChild1')

var shaMain = document.createElement('div')
    shaMain.setAttribute('class', 'shaMain')
)


createCard = async () => {
    var ads = [];
    var res = await db.collection('ads').get();

    res.forEach((doc)=> {
        ads.push(doc.data());
    });

    for(i = 0 , i < ads.length; i++){
        console.log('ads[]:', ads[i]);

        var main = document.getElementById('row1');

        var divAddBox = document.CreateElement(div);
        divAddBox.setAttribute('class', 'mainChild1')

        
    }


}