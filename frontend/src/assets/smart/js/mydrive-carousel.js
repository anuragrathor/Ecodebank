jQuery(document).ready(function() {
// Bootstrap Carousel Control Disable JS	
$('#MyDrive-carousel').on('slid', '', mydrivecheckitem);  // on carousel move
$('#MyDrive-carousel').on('slid.bs.carousel', '', mydrivecheckitem); // on carousel move
$(document).ready(function() {
	mydrivecheckitem();
});

function mydrivecheckitem(){
  var $this = $(".my-drive-carousel");
  if($('.my-drive-carousel .carousel-item:first').hasClass('active')) {
    $this.children('.my-drive-carousel .carousel-control-prev').hide();
  } else {
    $this.children('.my-drive-carousel .carousel-control-prev').show();
  } 
  
  if($('.my-drive-carousel .carousel-item:last').hasClass('active')) {
    $this.children('.my-drive-carousel .carousel-control-next').hide();
  } else {
    $this.children('.my-drive-carousel .carousel-control-next').show();
  } 
}
});