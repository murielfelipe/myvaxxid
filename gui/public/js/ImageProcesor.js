



var ImageProcesor = {


	 /**
	 * @name base64
	 * @description description
	 * @params data Server response
	 * @return {void} 
	 */
	 base64: function  (data64, maxSize) {

	 	return new Promise((resolve, reject)=>{

			//resize image
			var image = new Image();
			image.onload =  (imageEvent)=> {

			    // Resize the image
			    var canvas = document.createElement('canvas'),
			        max_size = maxSize,// TODO : pull max size from a site config
			        width = image.width,
			        height = image.height;


			    let isHorizontal = width > height

			    let options = {
			    	cropCenter: true,
			    }
			    

			    let offsetX = 0
			    let offsetY = 0

			    if (isHorizontal) {

			        if (width > max_size) {

			        	if (options.cropCenter) {
			        		let  ratio = width / height
			        		height = max_size;
			                width = max_size * ratio;
			                offsetX = (width - max_size)/2 * -1
			        	} else {
			                height *= max_size / width;
			                width = max_size;
			        	}

			        }
			    } else {
			        if (height > max_size) {

			        	if (options.cropCenter) {
			        		let  ratio = height / width
			        		width = max_size;
			                height = max_size * ratio;
			                offsetY = (height - max_size)/2 * -1
			        	} else {
			                width *= max_size / height;
			            	height = max_size;
			        	}


			           
			        }
			    }
			    canvas.width = options.cropCenter? max_size: width;
			    canvas.height = options.cropCenter? max_size: height;
			    canvas.getContext('2d').drawImage(image, offsetX, offsetY, width, height);
			    var dataUrl = canvas.toDataURL('image/png');
			    resolve(dataUrl);
			    
			    /*canvas.toBlob((blob)=> {

				    let url = URL.createObjectURL(blob);
				    img.attr('src', url);

				     let readerBlob = new FileReader();
					 readerBlob.readAsDataURL(blob); 
					 readerBlob.onloadend = ()=> {
			    		 resolve(readerBlob.result);
					 }

				});*/
			}
			image.src = data64;
	 	})

	    
	 },







}







