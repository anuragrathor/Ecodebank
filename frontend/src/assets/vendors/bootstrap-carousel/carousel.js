jQuery(document).ready(function() {
	
$(".dcp-solution-box").click(function() {
   var myClass = $(this).attr("id");
   $(".areashow").hide();
   $(".areashow").removeClass("d-block");
   $("."+myClass).addClass( "d-block" );
   $(".dcp-solution-box").removeClass( "active-link" );
   $(this).addClass( "active-link" );
});

// Bootstrap Carousel Control Disable JS	
$('#app-custom-carousel').on('slid', '', checkitem);  // on carousel move
$('#app-custom-carousel').on('slid.bs.carousel', '', checkitem); // on carousel move
$(document).ready(function() {
	checkitem();
});

function checkitem(){
  var $this = $(".app-custom-carousel");
  if($('.app-custom-carousel .carousel-item:first').hasClass('active')) {
    $this.children('.app-custom-carousel .carousel-control-prev').hide();
  } else {
    $this.children('.app-custom-carousel .carousel-control-prev').show();
  } 
  
  if($('.app-custom-carousel .carousel-item:last').hasClass('active')) {
    $this.children('.app-custom-carousel .carousel-control-next').hide();
  } else {
    $this.children('.app-custom-carousel .carousel-control-next').show();
  } 
}
});