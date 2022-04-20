$(document).ready(function () {
    var sync1 = $("#carousel-steps-container");
    var sync2 = $("#step-carousel-slider");
    var slidesPerPage = 1; //globaly define number of elements per page
    var syncedSecondary = true;
    sync1
        .owlCarousel({
            items: 1,
			slideBy: 1,
			smartSpeed: 1000,
			slideSpeed: 2000,
            autoplay: false,
			autoplayTimeout:12000,
            dots: false,
            loop: true,
			responsiveRefreshRate: 100,
			nav: false,
			//navText: ["<i class='icon-test-pe'></i>", "<i class='icon-testimonial-next'></i>"],
			responsive: {
                0: {
					slideBy: 1,
					//nav: true,
					autoplay: true,
					smartSpeed: 1500,
					autoplayTimeout:15000,
                },
                768: {
					//nav: false,
                },
            },
        })
        .on("changed.owl.carousel", syncPosition);

    sync2
        .on("initialized.owl.carousel", function () {
            sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            items: 5,
			dots: true,
            nav: false,
            smartSpeed: 1000,
			slideSpeed: 2000,
            slideBy: 1, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
			animateOut: "slideOutLeft",
			animateIn: "slideInRight",
            responsiveRefreshRate: 100,
            responsive: {
                0: {
                    items: 3,
					autoplay: true,
					smartSpeed: 1500,
					autoplayTimeout:15000,
                },
                768: {
                    items: 5,
                    nav: false,
					mouseDrag: false,
                },
            },
        }).on("changed.owl.carousel", syncPosition2);

    function syncPosition(el) {
        //if you set loop to false, you have to restore this next line
        //var current = el.item.index;

        //if you disable loop you have to comment this block
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }

        //end block

        sync2.find(".owl-item").removeClass("current").eq(current).addClass("current");
        var onscreen = sync2.find(".owl-item.active").length - 1;
        var start = sync2.find(".owl-item.active").first().index();
        var end = sync2.find(".owl-item.active").last().index();
		
        if (current > end) {
            sync2.data("owl.carousel").to(current, 100, true);
        }
        if (current < start) {
            sync2.data("owl.carousel").to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            sync1.data("owl.carousel").to(number, 100, true);
        }
    }

    sync2.on("click", ".owl-item", function (e) {
        e.preventDefault();
        var number = $(this).index();
        sync1.data("owl.carousel").to(number, 200, true);
    });
	
	$("#owl-demo").owlCarousel({
		items: 1,
		nav: false,
		autoplay:true,
		autoplayTimeout:8000,
		dots: false,
		loop: true,
		mouseDrag: false,
		animateOut: "slideOutLeft",
		animateIn: "slideInRight",
  });
  
	$(document).scroll(function () {   
		var windowhight1 = screen.height;
		var scroll = $(window).scrollTop();
		var objectSelect = $(".feature-section");
		var nextsection = $('.benefits-section').offset().top + windowhight1/2 - 20;
		var objectPosition = objectSelect.offset().top - 200 ;
		if (scroll > objectPosition) {
			sync1.trigger('play.owl.autoplay');
			$('.feature-section').removeClass('paused');
		}
		else {
			sync1.trigger('stop.owl.autoplay');
			$('.feature-section').addClass('paused');
		}
		
		if (scroll > nextsection) {				
			sync1.trigger('stop.owl.autoplay');	
			$('.feature-section').addClass('paused');
		}
	});
});

// Pricing Page JS Start
$(document).ready(function() {
	$("a.xs-tab-btn").click(function() {
	   var tab_id = $(this).attr("id");
	   $('.xs-tab-btn').removeClass('active');
	   $(this).addClass('active');
	   $(".xs-tab-content").hide();
	   $(".xs-tab-content").removeClass("d-block");
	   $("."+tab_id).addClass( "d-block");
	});
});
	
$(document).ready(function() {
var price5 = $("#price_table_xs3");
  var price6 = $("#price_table_nav3");
  var tablePerPage2 = 3; //globaly define number of elements per page
  var syncedSecondary3 = true;
  price5.css('opacity','1');
  price5.owlCarousel({
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

  price6
    .on('initialized.owl.carousel', function () {
      price6.find(".owl-item").eq(0).addClass("current1");
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
    var count3 = el.item.count-1;
    var current3 = Math.round(el.item.index - (el.item.count/2) - .5);
    
    if(current3 < 0) {
      current3 = count3;
    }
    if(current3 > count3) {
      current3 = 0;
    }
    
    //end block

    price6
      .find(".owl-item")
      .removeClass("current1")
      .eq(current3)
      .addClass("current1");
    var onscreen1 = price6.find('.owl-item.active').length - 1;
    var first3 = price6.find('.owl-item.active').first().index();
    var last3 = price6.find('.owl-item.active').last().index();
    
    if (current3 > last3) {
      price6.data('owl.carousel').to(current3, 100, true);
    }
    if (current3 < first3) {
      price6.data('owl.carousel').to(current3 - onscreen1, 100, true);
    }
  }

	
  function syncPosition5(el) {
    if(syncedSecondary3) {
      var number2 = el.item.index;
      price5.data('owl.carousel').to(number2, 100, true);
    }
  }
  
  price6.on("click", ".owl-item", function(e){
    e.preventDefault();
    var number2 = $(this).index();
    price5.data('owl.carousel').to(number2, 300, true);
  });
});
  $(document).scroll(function () {   
	  if ($(window).width() <= 767){	
		var windowhight2 = screen.height;
		var scroll = $(window).scrollTop();
		var objectSelect1 = $(".pricing-table-container");
		var nextsection1 = $('#price_table_scroll_end').offset().top - 160;
		var objectPosition1 = objectSelect1.offset().top - 20 ;
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