
//--- Open Selected Image-----
 var showImg = function (param){
     //--selected html in param and for testing uncomment console.
     console.log("selected Image", param)
     var showImg = document.getElementById('showImg');
     showImg.setAttribute('src', param.src);
     showImg.setAttribute('class', "showImg");
     showImg.setAttribute('onclick', 'hideImg(this)');

    }

 
    //---- hide Image ----
 var hideImg = function (param){

    var showImg = document.getElementById(param.id);
    showImg.setAttribute('class', "hide");

 }




// ----render images  using dom----
 var printImages = function (){

    //---array of images
     var imgArr = [
        {name:'img_1'},
        {name:'img_2'},
        {name:'img_3'},
        {name:'img_4'},
        {name:'img_5'},
        {name:'img_6'}
    ];

    //-- loop for rendering images one by one using dom
    for(var i=0; i < imgArr.length; i++ ){

        //--create img tag 
         var imgTag = document.createElement('img');

        //-- add attribute of "src" and "onclick" in image tag 
         imgTag.setAttribute('src', 'images/'+imgArr[i].name+'.jpg');
         imgTag.setAttribute('onclick', 'showImg(this)');
        
         //-- target htlm element using id
         var main = document.getElementById('images');

         //-- adding element in htlm
          main.appendChild(imgTag);

    }
 };

//--calling function
printImages();
