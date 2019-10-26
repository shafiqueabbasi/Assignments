var printImages = function(){

	var imagesArr =[
	{name : "image1"},
	{name : "image2"},
	{name : "image3"},
	{name : "image4"},
	{name : "image5"},
	{name : "image6"},
	];

	for (var i = 0; i < imagesArr.length; i++) {

		var imgTag = document.createElement('img');

		imgTag.setAttribute('src', 'Images/'+imagesArr[i].name+'.jpg' );
		imgTag.setAttribute('onClick', 'showImage(this)');
		imgTag.setAttribute('class', 'imgheight');

		var main = document.getElementById('images');

		main.appendChild(imgTag);
		console.log(main)
	}
};

printImages();

 var showImage = function (param){
     console.log("selected Image", param)

     var showImage = document.getElementById('showImage');
     showImage.setAttribute('src', param.src);
     showImage.setAttribute('class', "showImage");
     showImage.setAttribute('onClick', 'hideImg(this)');

    }

 
 var hideImg = function (param){

    var showImage = document.getElementById(param.id);
    showImage.setAttribute('class', "hide");

 }
