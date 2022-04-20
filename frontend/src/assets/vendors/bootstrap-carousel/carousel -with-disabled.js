/* Add CSS */
.carousel-over { pointer-events: none;  }
jQuery(document).ready(function() {
	
$("#app-carousel").carousel({
		interval : false
	});


$(".dcp-solution-box").click(function() {
   var myClass = $(this).attr("id");
   //alert(myClass);
   $(".areashow").hide();
   $(".areashow").removeClass("d-block");
   $("."+myClass).addClass( "d-block" );
   $(".dcp-solution-box").removeClass( "active-link" );
   $(this).addClass( "active-link" );
});

 $('.carousel-over').css("pointer-events","none");
  if ( $(window).width() >= 768 ) {
   var width = $(window).width();
	$('a.carousel-control-prev').addClass("carousel-over");
	$('.app-carousel').carousel({wrap: false}).on('slid.bs.carousel', function () {
		 
		if( width >= 992 && $('.carousel-item:nth-last-child(5)').hasClass('active') ) {
				$('a.carousel-control-next').addClass("carousel-over");
            }
			else if( width >= 768 && width <= 991 && $('.carousel-item:nth-last-child(4)').hasClass('active') ) {
				$('a.carousel-control-next').addClass("carousel-over");
			}
			else{
			  $('a.carousel-control-next').removeClass("carousel-over"); 
			}
		  
		if ($('.carousel-item:first').hasClass('active')) {
			$('a.carousel-control-prev').addClass("carousel-over");
			}
			else {
				$('a.carousel-control-prev').removeClass("carousel-over"); 
			}	
	});
	
	/* disable without window width and condition */
			/* $('a.carousel-control-prev').removeAttr("href");
		$('.app-carousel').carousel({wrap: false}).on('slid.bs.carousel', function () {
			
			if ($('.carousel-item:nth-last-child(5)').hasClass('active')) {
				$('a.carousel-control-next').removeAttr("href");
			}
			else {
				 $('a.carousel-control-next').attr("href","#app-carousel"); 
			  }	
			  
			if ($('.carousel-item:first').hasClass('active')) {
				$('a.carousel-control-prev').removeAttr("href");
				}
			else {
				$('a.carousel-control-prev').attr("href","#app-carousel"); 
			}	
		}); */
};
});
