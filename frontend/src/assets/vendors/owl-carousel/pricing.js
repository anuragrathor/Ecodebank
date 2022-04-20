// Pricing Page JS Start
$(document).ready(function() {
	/*Add smooth scroll on hashtag anchors*/
	$("a[href='#featurescomparision']").on('click', function(event) {    
		if (this.hash !== "") {      
		  event.preventDefault();      
		  var hash = this.hash;      
		  $('html, body').animate({
			scrollTop: $(hash).offset().top
		  }, 800, function(){
			window.location.hash = hash;
		  });
		} 
	  });
	
	// Pricing Page JS Start
	//$(document).ready(function() {
	//	$("a.xs-tab-btn").click(function() {
	//	   var tab_id = $(this).attr("id");
	//	   $('.xs-tab-btn').removeClass('active');
	//	   $(this).addClass('active');
	//	   $(".xs-tab-content").hide();
	//	   $(".xs-tab-content").removeClass("d-block");
	//	   $("."+tab_id).addClass( "d-block");
	//	});
	//});

	// Pricing Page JS Start
	$(document).ready(function() {
		$("[name=first-switch]").click(function(){
			$('.xs-tab-content').addClass("d-none");
			$('.xs-tab-content').removeClass("d-block");
			// Table Toggle
			$("#pricing-tab"+$(this).val()).addClass( "d-block");
			$("#pricing-tab"+$(this).val()).removeClass( "d-none");
			// Table Header XS View Toggle
			$("#price_table_nav"+$(this).val()).addClass( "d-block");
			$("#price_table_nav"+$(this).val()).removeClass( "d-none");
		});
	});
});
// Solution Table Stickey Header

$(document).ready(function() {
  var price1 = $("#price_table_xs1");
  var price2 = $("#price_table_nav1");
  var tablePerPage = 3; //globaly define number of elements per page
  var syncedSecondary1 = true;
  price1.css('opacity','1');
  price1.owlCarousel({
	slideSpeed: 400,
	nav: false,
	autoplay: false,
	dots: false,
	loop: true,
	responsiveRefreshRate: 100,
	responsive:{
        0:{
            items:1,
			mouseDrag: true,
			stagePadding: 15,
        },
        768:{
            items:3,
			autoplay: false,
			mouseDrag: false,
			loop: false,
			stagePadding: 0,
        }
    },
       
}).on('changed.owl.carousel', syncPosition);

  price2
    .on('initialized.owl.carousel', function () {
      price2.find(".owl-item").eq(0).addClass("current1");
    })
    .owlCarousel({
	items: 3,
	dots: true,
	nav: false,
	smartSpeed: 100,
	slideSpeed: 400,
	slideBy: 1, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
	responsiveRefreshRate: 100,
	mouseDrag: false,
  }).on('changed.owl.carousel', syncPosition4);

  function syncPosition(el) {
    //if you set loop to false, you have to restore this next line
    //var current1 = el.item.index;
    
    //if you disable loop you have to comment this block
    var count1 = el.item.count-1;
    var current1 = Math.round(el.item.index - (el.item.count/2) - .5);
    
    if(current1 < 0) {
      current1 = count1;
    }
    if(current1 > count1) {
      current1 = 0;
    }
    
    //end block

    price2
      .find(".owl-item")
      .removeClass("current1")
      .eq(current1)
      .addClass("current1");
    var onscreen = price2.find('.owl-item.active').length - 1;
    var first1 = price2.find('.owl-item.active').first().index();
    var last1 = price2.find('.owl-item.active').last().index();
    
    if (current1 > last1) {
      price2.data('owl.carousel').to(current1, 100, true);
    }
    if (current1 < first1) {
      price2.data('owl.carousel').to(current1 - onscreen, 100, true);
    }
  }

	
  function syncPosition4(el) {
    if(syncedSecondary1) {
      var number = el.item.index;
      price1.data('owl.carousel').to(number, 100, true);
    }
  }
  
  price2.on("click", ".owl-item", function(e){
    e.preventDefault();
    var number = $(this).index();
    price1.data('owl.carousel').to(number, 300, true);
  });
});
$(document).ready(function() {
var price3 = $("#price_table_xs2");
  var price4 = $("#price_table_nav2");
  var tablePerPage1 = 3; //globaly define number of elements per page
  var syncedSecondary2 = true;
  price3.css('opacity','1');
  price3.owlCarousel({
	slideSpeed: 400,
	nav: false,
	autoplay: false,
	dots: false,
	loop: true,
	responsiveRefreshRate: 100,
	responsive:{
        0:{
            items:1,
			mouseDrag: true,
			stagePadding: 15,
        },
        768:{
            items:3,
			autoplay: false,
			mouseDrag: false,
			loop: false,
			stagePadding: 0,
        }
    },
       
}).on('changed.owl.carousel', syncPosition);

  price4
    .on('initialized.owl.carousel', function () {
      price4.find(".owl-item").eq(0).addClass("current1");
    })
    .owlCarousel({
	items: 3,
	dots: true,
	nav: false,
	smartSpeed: 100,
	slideSpeed: 400,
	slideBy: 1, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
	responsiveRefreshRate: 100,
	mouseDrag: false,
  }).on('changed.owl.carousel', syncPosition5);

  function syncPosition(el) {
    //if you set loop to false, you have to restore this next line
    //var current1 = el.item.index;
    
    //if you disable loop you have to comment this block
    var count2 = el.item.count-1;
    var current2 = Math.round(el.item.index - (el.item.count/2) - .5);
    
    if(current2 < 0) {
      current2 = count2;
    }
    if(current2 > count2) {
      current2 = 0;
    }
    
    //end block

    price4
      .find(".owl-item")
      .removeClass("current1")
      .eq(current2)
      .addClass("current1");
    var onscreen1 = price4.find('.owl-item.active').length - 1;
    var first2 = price4.find('.owl-item.active').first().index();
    var last2 = price4.find('.owl-item.active').last().index();
    
    if (current2 > last2) {
      price4.data('owl.carousel').to(current2, 100, true);
    }
    if (current2 < first2) {
      price4.data('owl.carousel').to(current2 - onscreen1, 100, true);
    }
  }

	
  function syncPosition5(el) {
    if(syncedSecondary2) {
      var number1 = el.item.index;
      price3.data('owl.carousel').to(number1, 100, true);
    }
  }
  
  price4.on("click", ".owl-item", function(e){
    e.preventDefault();
    var number1 = $(this).index();
    price3.data('owl.carousel').to(number1, 300, true);
  });
  });
	

$(document).scroll(function () {   
	  if ($(window).width() <= 767){	
		var windowhight2 = screen.height;
		var scroll = $(window).scrollTop();
		var objectSelect1 = $(".pricing-table-container");
		var nextsection1 = $('#price_table_scroll_end').offset().top - 160;
		var objectPosition1 = objectSelect1.offset().top - 20;
		if (scroll > objectPosition1) {
			$('.price-table-xs-header').addClass('table-header-fixed');
		}
		else {
			$('.price-table-xs-header').removeClass('table-header-fixed');
			$('.table-price-show').removeClass('d-block');
		}
		
		if (scroll > nextsection1) {				
			$('.price-table-xs-header').removeClass('table-header-fixed');
			$('.table-price-show').removeClass('d-block');
		}
		}
		
	});
// Pricing Page JS End
