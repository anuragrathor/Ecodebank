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




	$('.app-carousel').on('slide.bs.carousel', function (e) {
	    var $e = $(e.relatedTarget);
	    var idx = $e.index();
		console.log(idx);
	    var itemsPerSlide = 5;
	    var totalItems = $(this).find('.carousel-item').length;
	    if (idx >= totalItems-(itemsPerSlide-1)) {
	        var it = itemsPerSlide - (totalItems - idx);
	        for (var i=0; i<it; i++) {
	            if (e.direction=="left") {
	                $(this).find('.carousel-item').eq(i).appendTo('.carousel-inner');
	            }
	            else {
	                $(this).find('.carousel-item').eq(0).appendTo('.carousel-inner');
	            }
	        }
	    }
	});
		
});


