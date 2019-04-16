window.onload = function(){
	
    search();
	banner();

}
function banner(){
	var bbox = document.querySelector(".su_banner");
	var imgBox = document.querySelector(".su_banner ul");
	var lis = document.querySelectorAll(".su_banner ul li ");
	var points = document.querySelectorAll(".su_banner ol li");
	var index = 0 ; 
	var width = lis[0].offsetWidth;
	var timer = setInterval(changeImage,2500);

	function changeImage(){
		index++;
		if(index > lis.length-1){
			index=0;
		}
		imgBox.style.webkitTransform ="translateX("+(-index*width)+"px)";
		imgBox.style.transform ="translateX("+(-index*width)+"px)";
		setPoint();
	}


	function setPoint(){		
		for(var i = 0 ; i < points.length; i ++){		
			points[i].classList.remove("active");
		}

		points[index].classList.add("active");
	}
	bbox.addEventListener('mouseover',function(){
		clearInterval(timer);
	});
	bbox.addEventListener('mouseleave',function(){
		timer = setInterval(changeImage,1500);
	});
	bbox.addEventListener('touchstart',function(){	
		clearInterval(timer);
	})
	bbox.addEventListener('touchstart',function(){
	
		timer = setInterval(changeImage,1500);
	})
}
 
/* 搜索框效果*/


function search(){

	window.onscroll = function(){

		var banner = document.querySelector(".su_banner");
		var headerBox = document.querySelector(".su_header_box");
		var sTop = document.documentElement.scrollTop || document.body.scrollTop;
	
		if(sTop > 0){

	      headerBox.style.background="rgb(255, 192, 1)";

		}else{
			headerBox.style.background="transparent";
		}
	}
}