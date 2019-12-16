db = firebase.firestore();

function showdata(){
    var category = document.getElementById('Category').value;
    var location = document.getElementById('Location').value;
    var brand = document.getElementById('Brand').value;
    var contact = document.getElementById('Contact').value;
    var description = document.getElementById('Description').value;
    var price = document.getElementById('Price').value;

    console.log('Category' ,category);
    console.log('Location', location);
    console.log('Brand', brand);
    console.log('Contact', contact);
    console.log('Description', description);
    console.log('Price', price);


    var obj = {
        category,
        location,
        brand,
        contact,
        description,
        price,
    }

    var arr = ['category', 'location', 'brand', 'contact', 'description', 'price'];
    
    console.log('obj', obj);
    console.log('arr', arr);
    saveAtFireStore(obj);    

}

saveAtFireStore = (data) =>{
    db.collection('ads').add(data).then(()=> {
        console.log('data added',)
    }).catch(err=>{
        console.log('error')
    })
}

async function getData(){
    var res = await db.collection('ads').get();
    res.forEach((doc)=>{
        console.log("my data ", doc.data())
    })

}



// olxcard.js


createCard = async () => {
    var ads = [];
    var res = await db.collection('ads').get();

    res.forEach((doc)=> {
        ads.push(doc.data());
    });

    for(i = 0 , i < ads.length; i++){
        console.log('ads[]:', ads[i]);
    }


}


