$(document).ready(function () {
	
	// Boosttarp Selectpicker Scrollbar Plugins //
//	$( document ).on( "click", ".select-btn-style", function() {
//		$(this).closest('.bootstrap-select').find('.scroll-theme').mCustomScrollbar({
//			theme:"inset-3",			
//			mouseWheel:{ preventDefault:true }
//		});	
//	});
	
	// DCP Solution Menu On Document Click Close Mobile menu //
	$( document ).on( "click", "*", function(e) {
		if (e.target != this)return;
		if(!$(this).closest('.dcp-solution-wrapper').length && !$(this).closest('.dcp-appmenu-btn').length){
			$("a.dcp-appmenu-btn").removeClass("closeapp-menu");  
			$(".dcp-solution-wrapper").removeClass("dcp-solution-expanded");			
		}
		if($(this).closest('.dcp-appmenu-btn').length){
			$('.dcp-appmenu-btn').toggleClass("closeapp-menu"); 	
			$(".dcp-solution-wrapper").toggleClass("dcp-solution-expanded");
			
		}
		
		if(!$(this).closest('.dcp-notification-wrapper').length && !$(this).closest('.dcp-notify-btn').length){
			$("a.dcp-notify-btn").removeClass("closeapp-menu");  
			$(".dcp-notification-wrapper").removeClass("dcp-notification-expanded");			
		}
		if($(this).closest('.dcp-notify-btn').length){
			$('.dcp-notify-btn').toggleClass("closeapp-menu"); 	
			$(".dcp-notification-wrapper").toggleClass("dcp-notification-expanded");			
		}
		/* Remove Notification Dropdown */
		if($(this).closest('.close-area-btn').length){
			$("a.dcp-notify-btn").removeClass("closeapp-menu");  
			$(".dcp-notification-wrapper").removeClass("dcp-notification-expanded");			
		}
				
	});
	
	
	
		
	
	/* On hover class add on single level dropdown*/
		$('li.dropdown-single-level').hover(
		   function(){ $(this).addClass('hover') },
		   function(){ $(this).removeClass('hover') }
	)
	
	// Base Price Chart DropDown Select //
	 $("#SelectSolution").change(function(){
        $(this).find("option:selected").each(function(){
            var optionValue = $(this).attr("value");
            if(optionValue){
                $(".hide-package").not("." + optionValue).hide();
                $("." + optionValue).show();
            } else{
                $(".hide-package").hide();
            }
        });
    })
	$("#PackageSolution").change(function(){
        $(this).find("option:selected").each(function(){
            var optionValue = $(this).attr("value");
            if(optionValue){
                $(".show-package").not("." + optionValue).hide();
                $("." + optionValue).show();
            } else{
                $(".show-package").hide();
            }
        });
    })
	$("#HidePackage").hide();
	$("#ShowPackage").click(function(){
		$("#HidePackage").show();
	});
	
	// Mobile Menu Toggle Button //
	$(".navbar-toggler").click(function(){
		$(this).toggleClass("closebutton");  
    });
	
	// On Document Click Close Mobile menu //
	$('*').click(function(e){
		if (e.target != this)return;
		if($(this).closest('.smart-nav-header').length < 1){
			$(".navbar-toggler").removeClass("closebutton");  
			$("#smartappmenu").removeClass("show");
		}
	});
	

	
	//Apps modal popup solutions dropown value select */
	$(".app-modal-header .dropdown-menu a.dropdown-item").click(function(){
		var selText = $(this).text();
		$(this).parents('li.nav-item.dropdown').find('.dropdown-toggle').html(selText);
	});
	//DCP Apps modal popup solutions dropown value select */
	$(".dcp-app-modal-top .dropdown-menu a.dropdown-item").click(function(){
		var selText = $(this).text();
		$(this).parents('li.nav-item.dropdown').find('.dropdown-toggle').html(selText);
	});
	
	// Template Popup Preview JS
	$(".template-preview").click(function(){
		$('.template-preview-wrapper').show();
		$('body').css('overflow-y', 'hidden');
		
	});
	$(".template-preview-close").click(function(){
		$('.template-preview-wrapper').hide();
		$('body').css('overflow-y', 'auto');
	});
	

	// Stop Propagation  Dropdown Js //	  	
	$('div.dropdown-menu.stoppropagation').on('click', function (event) {
		event.stopPropagation();
	});
	$('div.dropdown-menu .stoppropagation').on('click', function (event) {
		event.stopPropagation();
	});
	
	// Integration Module  Stop Propagation Dropdown hide on inside cancel button //
	
	$('.cancelbutton').on('click', function(){
		$(this).closest(".dropdown-menu").removeClass("show");
		
	});
		$('.integration-box-show').on('click', function(){
		$(this).closest(".dropdown-menu").addClass("show");
	});
	
	
	// Table Filter Jquery //
		$(".t-wauto").css("flex", "auto");
		$(".t-wauto").css("-webkit-box-flex", "auto");
		$(".t-wauto").css("-ms-flex", "auto");
		$(".filter-list-open, .filter-hide").click(function () {		
		$(".t-wauto").toggleClass("tw-100");
		$(".col-xs-1-5").toggleClass("col-lg-1-5 col-lg-4");
		//$(".entries-hide").toggle();
		//$(".hide-text-md").toggleClass("d-none");
		$("i.icon-filter").toggleClass("p-blue-clr");
		//$(".filter-div-select").removeClass("d-block");
		if($(".t-wauto").hasClass("tw-100")){
			$(".filter-div-select").removeClass("d-block");
		}else{
			setTimeout(function(){
			$(".filter-div-select").toggleClass("d-block");
			stick();
			
		},500);
		}		
	});


	// Table Checkbox Select & Show Table Option Jquery //
	$("#checkAll, #checkAll1, #checkAll2").click(function () {
		$('input:checkbox').not(this).prop('checked', this.checked);
		checkboxCheckStatus();
	});

	function checkboxCheckStatus() {
		if ($('.checkbox-active:checked').length) {
			if (!$(".table-option-manage").hasClass("d-block")) {
				$(".table-option-manage").addClass("d-block");
				$("table thead th").addClass("thopacity");
				$(".table-option-hide").hide();
			}
		} else {
			$(".table-option-manage").removeClass("d-block");
			$(".table-option-hide").show();
			$("table thead th").removeClass("thopacity");
		}

		var flag = true;
		$(".checkbox-active").filter(function () {
			if (!$(this).is(':checked')) {
				flag = false;
			}
		});
		if (flag) {
			$('#checkAll, #checkAll1').prop('checked', true);
			//$("table thead th").addClass("thopacity");
		} else {
			$('#checkAll, #checkAll1').prop('checked', false);
			//$("table thead tr th").removeClass("thopacity");
		}
	}

	$(".checkbox-active").click(function () {
		checkboxCheckStatus();
	});


	// Tags Input js //
	$(function () {
		$('#primary').tagsInput({
			width: 'auto'
		});
		$('#secondary').tagsInput({
			width: 'auto'
		});
		$('#emailtags').tagsInput({
			width: 'auto'
		});
		$('#devices').tagsInput({
			width: 'auto'
		});
		$('#browsers').tagsInput({
			width: 'auto'
		});
		$('#operating-systems').tagsInput({
			width: 'auto'
		});
		$('#visitor-type').tagsInput({
			width: 'auto'
		});
		$('#mail-to').tagsInput({
			width: 'auto'
		});
		$('#mail-cc').tagsInput({
			width: 'auto'
		});
		$('#mail-bcc').tagsInput({
			width: 'auto'
		});
	});

	// Toggle plus minus icon on show hide of collapse element
	$(".collapse").on('show.bs.collapse', function () {

		$(this).parent().find(".icon").removeClass("icon-add").addClass("icon-minus");

		$(this).closest(".filter-divide-bg").addClass("vl-gblue-bg mb10 filter-divide-show");
		$(".filter-scrollbar").addClass("filter-pb0");


	}).on('hide.bs.collapse', function () {

		$(this).parent().find(".icon").removeClass("icon-minus").addClass("icon-add");

		$(this).closest(".filter-divide-bg").removeClass("vl-gblue-bg mb10 filter-divide-show");
		$(".filter-scrollbar").removeClass("filter-pb0");
	});

	// Tooltip js //
	$('[data-toggle="tooltip"]').tooltip({
		trigger : 'hover'
	}) 

	// Toogle Password //
	$(".toggle-password").click(function () {
		$(".toogle-icon").toggleClass("icon-show icon-hide");
		var input = $($(this).attr("toggle"));
		if (input.attr("type") == "password") {
			input.attr("type", "text");
		} else {
			input.attr("type", "password");
		}
	});
	
		$(".toggle-password1").click(function () {
		$(".toogle-icon1").toggleClass("icon-show icon-hide");
		var input = $($(this).attr("toggle"));
		if (input.attr("type") == "password") {
			input.attr("type", "text");
		} else {
			input.attr("type", "password");
		}
	});
	
		$(".toggle-password2").click(function () {
		$(".toogle-icon2").toggleClass("icon-show icon-hide");
		var input = $($(this).attr("toggle"));
		if (input.attr("type") == "password") {
			input.attr("type", "text");
		} else {
			input.attr("type", "password");
		}
	});

	// Input Password Focus Show Div //
	$('.password-tooltip').hide();
	$(".password-match").on('focus', function () {
		$('.password-tooltip').show('slow');
	})
	$(".password-match").on('focusout', function () {
		$('.password-tooltip').hide('slow');
	});
	
	
	// Stickey Header Js //
	$(window).scroll(function () {
		onScrollEvent();
	});
	
// Header Sticky js //
 $(window).scroll(function(){
      if ($(this).scrollTop() > 60) {
          $('#fixonscroll').addClass('sticky-navbar');
          $('.virtual-div').addClass('add-vdiv');
		  $('.header-profile-dropdown').find('.show').addClass('header-drophideshow');
		 
		 $('.dcp-solution-toggle.dcp-solution-expanded').addClass('show-solution');
		  $('.dcp-solution-toggle.dcp-solution-expanded').removeClass('dcp-solution-expanded');
		  $('.dcp-notification-toggle.dcp-notification-expanded').addClass('show-solution');
		  $('.dcp-notification-toggle.dcp-notification-expanded').removeClass('dcp-notification-expanded');
     	 } else {
          $('#fixonscroll').removeClass('sticky-navbar');
          $('.virtual-div').removeClass('add-vdiv');
		  $('.header-profile-dropdown').find('.dropdown-menu').removeClass('header-drophideshow');
		
		$('.dcp-solution-toggle.show-solution').addClass('dcp-solution-expanded');
		  $('.dcp-solution-toggle').removeClass('show-solution');
		  
		  $('.dcp-notification-toggle.show-solution').addClass('dcp-notification-expanded');
		  $('.dcp-notification-toggle').removeClass('show-solution');		
      }
	  
  });
  
			
	// Library Details Tooltip js //
/*  $(function(){
	var tooltip = '.library-tooltip-div';
	$('.mytooltip-hover').on('mouseover',function(e){
		
		e.preventDefault();
		
		if($(tooltip).length){
			$('body').append('<div class="library-tooltip-div"></div>');
		}
		console.log(e.pageX);
		
		$(tooltip).css({'left':e.pageX-20+'px','top':e.pageY+25+'px'});
		$(tooltip).show();
	});
	$('.mytooltip-hover').on('mouseout',function(){
		$(tooltip).hide();
	});
	$('.mytooltip-hover').on('mousemove',function(e){
		$(tooltip).css({'left':e.pageX-20+'px','top':e.pageY+25+'px'});
	});
}); */
	
 $(".mytooltip-hover").hover(function(){
        tip = $("body").find('.tooltipright');
        tip.show(); //Show tooltip
    }, function() {
        tip.hide(); //Hide tooltip        
    }).mousemove(function(e) {
        var mousex = e.pageX + 20; //Get X coodrinates
        var mousey = e.pageY + 20; //Get Y coordinates
        var tipWidth = tip.width(); //Find width of tooltip
        var tipHeight = tip.height(); //Find height of tooltip
          $(".library-tooltip-div").removeClass("library-tooltip-left");
        //Distance of element from the right edge of viewport
        var tipVisX = $(window).width() - (mousex + tipWidth);
        //Distance of element from the bottom of viewport
        var tipVisY = $(window).height() - (mousey + tipHeight);

        if ( tipVisX < 20 ) { //If tooltip exceeds the X coordinate of viewport
            mousex = e.pageX - tipWidth - 20;
			 $(".library-tooltip-div").addClass("library-tooltip-left");
        } //if ( tipVisY < 20 ) { //If tooltip exceeds the Y coordinate of viewport
           // mousey = e.pageY - tipHeight - 20;
        //} 
        tip.css({  top: mousey, left: mousex });
		
    });

// Library Grid View Toggle script //
	$("#lib-grid-view").click(function () {
		$(".lib-table-view-hide").removeClass("d-flex").addClass("d-none");
		$(".lib-grid-view-show").toggleClass("d-none d-block");
	
	});
	
	// Library Table View Toggle script //
		$("#lib-table-view").click(function () {
		$(".lib-table-view-hide").toggleClass("d-none");
		$(".lib-table-view-hide").toggleClass("d-flex");
		$(".lib-grid-view-show").toggleClass("d-block d-none");
	
	});
		// Safari browser drag and drop js //
                   var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
                   var isIE = /*@cc_on!@*/false || !!document.documentMode;
                   if(isSafari==true){
                       $('#safari_show').css("display","block");
                       $('#other_show').remove();
                   }
                   else if(isIE==true){
                       $('#safari_show').css("display","block");
                       $('#other_show').remove();
                   }
                    else {
                       $('#other_show').css("display","block");
                       $('#safari_show').remove();
                   }
           
		   // Scroll bottom on click js //
			$(".details-section").hide();
			$(".view-detail-img-icon, .restore-detail").click(function() {
				$(".details-section").show();
				$('html,body').animate({
					scrollTop: $(".details-section").offset().top},
				'slow');
			});


		 // On scroll Div Fixed For compare section js //

			 $(window).scroll(function(){
			 if($('.compare-div').length){
	if($(this).scrollTop() > 150){
		$('.compare-div').addClass('sticky-compare')
		$('.compare-mtop').addClass('margintop-div')
		$('img[src="'+cdnUrl+'assets/images/vs-icon.png"]').each(function(){
			$(this).attr("src",cdnUrl+"assets/images/vs-white-icon.png");
		});
		$('img[src="'+cdnUrl+'assets/images/vs-icon.png"]').each(function(){
			$(this).attr("src",cdnUrl+"assets/images/vs-white-icon.png");
		});
	}
	else{	
		$('.compare-div').removeClass("sticky-compare")
		$('.compare-mtop').removeClass('margintop-div')
		$('img[src="'+cdnUrl+'assets/images/vs-white-icon.png"]').each(function(){
			$(this).attr("src",cdnUrl+"assets/images/vs-icon.png");
		});
		$('img[src="'+cdnUrl+'assets/images/vs-white-icon.png"]').each(function(){
			$(this).attr("src",cdnUrl+"assets/images/vs-icon.png");
		});
	}
}
});
			

	/* CMS Blog Edit js */
	$(".edit-field-show").hide();
	$(".edit-link").click(function(){
	$(this).closest('.project-list-view').find('.edit-field-show').show();
	$(this).closest('.project-list-view').find('.hide-edit-show').hide();
	}); 
	$(".cancel-edit").click(function(){
	$(this).closest('.project-list-view').find('.edit-field-show').hide();
	$(this).closest('.project-list-view').find('.hide-edit-show').show();
	}); 	
	
	$(".edit-link").click(function(){
	$(this).closest('.folders-block').find('.edit-field-show').show();
	$(this).closest('.folders-block').find('.hide-edit-show').hide();
	}); 
	$(".cancel-edit").click(function(){
	$(this).closest('.folders-block').find('.edit-field-show').hide();
	$(this).closest('.folders-block').find('.hide-edit-show').show();
	}); 

	
	/* Revision History Section JS */
	$(".revision-preview").click(function(){
    $(".revision-history").show();
	});
	$(".revision-history-close").click(function(){
    $(".revision-history").hide();

	});
	
		/* Reply Comment Section JS */
	$(".reply-box").click(function(){
    $(".reply-comment").show();
	});
	$(".reply-comment-close").click(function(){
    $(".reply-comment").hide();

	});
	
	
	// Boostarp Dropdown Arrow Placement js */
$(window).scroll(function() {
	customeDropdownArraow();
});

$(document).on("click", '.dropdown-toggle', function () {
	//alert($(this).offset().top-200);
	var height = $(this).next('.dropdown-menu').outerHeight();
	var offsetHeight = Math.abs($(this).offset().top - $(window).scrollTop() - $(window).outerHeight());
	$(this).next('.dropdown-menu').removeClass('bstop-arrow');
	if(offsetHeight < height){
		$(this).next('.dropdown-menu').addClass('bstop-arrow');
	}

})

function customeDropdownArraow(){
	$('[x-placement="bottom-start"]').removeClass('bstop-arrow');
	$('[x-placement="bottom-end"]').removeClass('bstop-arrow');
	if($('[x-placement="top-start"]').length){
		$('[x-placement="top-start"]').addClass('bstop-arrow');
	}
	if($('[x-placement="top-end"]').length){
		$('[x-placement="top-end"]').addClass('bstop-arrow');
	}
}

// Blog Publish Dropdwon Menu js //
	$(".publish-btn").click(function(){
		$(".publish-dropdown").toggle();
	});
	
	$(".draft-radio").click(function(){
		$(".publish-options").hide();
		$("#publish-action").val("Save as Draft");
	});
	
	$(".publish-radio").click(function(){
		$(".publish-options").show();
		$("#publish-action").val("Publish");
	});
	
	
	$(".now-radio").click(function(){
		$(".schedule-date").hide();
		$("#publish-action").val("Publish");
	});
	
	$(".schedule-date").hide();
	$(".later-radio").click(function(){
		$(".schedule-date").show();
		$("#publish-action").val("Schedule");
	});
	
	
	$(".protected-radio").click(function(){
		$(".password-field").show();

	});
	
	$(".password-field").hide();
	$(".password-field-hide").click(function(){
		$(".password-field").hide();
		
	});
	
/*Input Fields Enable Disable From Checkbox*/
$('#check-disable').change(function(){
   $(".disable-field").prop("disabled", $(this).is(':checked'));
});

$('#check-disable').change(function(){
    if($(this).is(":checked")) {
        $('.disable-text-field').addClass("disable-text");
    } else {
        $('.disable-text-field').removeClass("disable-text");
    }
});
/*End*/

// Alers Auto Hide Js //
// window.setTimeout(function() {
    // $(".alert").fadeTo(1000, 0).slideUp(500, function(){
        // $(this).slideUp(); 
    // });
// }, 4000);

// Bootstrap Color Picker js //
$(function() { 
	$('#cp3').colorpicker(
	{ color: '#AA3399' }
	);
 });



// User Information Fixed Right Section Jquery //
	$(".user-info,#screen-overlay").click(function () {
		$(".user-info-block,#screen-overlay").fadeToggle();
		$(".user-info-block").toggleClass("d-block");
		$("#screen-overlay").toggleClass("d-block");		
	});
	
// User Information Fixed Right Assign role Section Jquery //
	$("#assign-role").click(function () {
		$(".assign-role").fadeToggle();
		$(".assign-role").toggleClass("d-block");
				
	});
	
	$("#screen-overlay").click(function () {		
		$(".assign-role").removeClass("d-block");		
	});
	
	
// User Information Fixed Right Section Close-btn Jquery //
	$(".addnewacc-close").click(function () {		
		$(".user-info-block").toggleClass("d-block");
		$("#screen-overlay").toggleClass("d-block");
		$(".assign-role").removeClass("d-block");		
	});
	
	$(".addnewacc-assign-close").click(function () {
		$(".assign-role").removeClass("d-block");		
	});
	
	
	
	/*$(".user-info,.screen-overlay").click(function () {
		
	});*/
	
	// User Profile Fixed Right Section Jquery //
	$(".user-profile-edit,.fade-overlay,.close-profile").click(function () {
		$(".user-profile-informtion").toggleClass("d-block");
		$(".fade-overlay").toggleClass("d-block");		
	});
	
	
	
	
	
	
/*Hides File Input & Makes Anchor as Upload Button*/
$("#upload_link_primary").on('click', function(e){
    e.preventDefault();
    $("#upload_primary:hidden").trigger('click');
});

$("#library_link_upload").on('click', function(e){
    e.preventDefault();
    $("#library_upload:hidden").trigger('click');
});

$("#upload_link_secondary").on('click', function(e){
    e.preventDefault();
    $("#upload_secondary:hidden").trigger('click');
});
	
$("#upload_link_video").on('click', function(e){
    e.preventDefault();
    $("#upload_video:hidden").trigger('click');
});	





// Make Recent Activities height equal to left section
function recent_activity_height_set(){
	
	setTimeout(function(){
		var lsheight = $(".account-content-left").outerHeight();
		var rsheight = lsheight+70;
		$('.account-content-right').css('max-height', rsheight+'px');
		$('.mCustomScrollbar').mCustomScrollbar("update");
	})
	
	
}
recent_activity_height_set();
$('#Feedbacks-tab').click(function(){
recent_activity_height_set();
})
//Switch page width on tabs click
$("#feeds-tab").click(function(){
	$('.account-section-right').hide();
    $('.account-section-left').removeClass('col-12 col-md-7 col-xl-8 p0 mb40');
    $('.account-section-left').addClass('col-12 col-md-12 p0 mb40');
});
$("#summary-tab").click(function(){
	$('.account-section-right').show();
    $('.account-section-left').removeClass('col-12 col-md-12 p0 mb40');
    $('.account-section-left').addClass('col-12 col-md-7 col-xl-8 p0 mb40');
});
$("#Feedbacks-tab").click(function(){
	$('.account-section-right').show();
    $('.account-section-left').removeClass('col-12 col-md-12 p0 mb40');
    $('.account-section-left').addClass('col-12 col-md-7 col-xl-8 p0 mb40');
	
});


var value=$("input[name=pic]").val();
$('#preview-pic img').attr('src',value);
	
var doj=$("input[name=doj]").val();
$("#preview-doj").text(doj);
//On KeyUp Update
$("input[name='name']").keyup(function(){
	var value=$("input[name=name]").val();
	$("#preview-name").text(value);
});
$("input[name='name']").keyup(function(){
	var value=$("input[name=name]").val();
	$("#preview-name").text(value);
});
$("input[name='email']").keyup(function(){
	var value=$("input[name=email]").val();
	$("#preview-email").text(value);
});
$("input[name='mobile']").keyup(function(){
	var value=$("input[name=mobile]").val();
	$("#preview-mobile").text(value);
});
$("input[name='role']").keyup(function(){
	var value=$("input[name=role]").val();
	$("#preview-role").text(value);
});
$("input[name='company']").keyup(function(){
	var value=$("input[name=company]").val();
	$("#preview-company").text(value);
});




//Email Editor
//Hide Elements By Default
$(".me-container").hide();
$(".me-cc-box").hide();
$(".me-bcc-box").hide();

$('#show-cc-box').on('click', function(){
	$(".me-cc-box").toggle();
});	
$('#show-bcc-box').on('click', function(){
	$(".me-bcc-box").toggle();
});	
$('#profile-mail').on('click', function(){
	$(".me-container").show();
});
//On Mail Editor Close Button
$('#me-close').on('click', function(){
	$(".me-container").hide();
	$(".screen-overlay-dark").hide();
	$("#me-fullscreen").show();
	$("#me-smallscreen").hide();
	$('#me-section').removeClass('me-container me-container-fullscreen col-12 col-md-10 col-lg-8 offset-0 offser-md-1 offset-lg-2 p0');
    $('#me-section').addClass('me-container col-12 col-md-6 col-lg-6 col-xl-5 p0');
});	
//On Mail Editor Minimize Button
$('#me-minimize').on('click', function(){
	$(".me-body").toggle();
	$(".screen-overlay-dark").hide();
	$("#me-fullscreen").show();
	$("#me-smallscreen").hide();
	$('#me-section').removeClass('me-container me-container-fullscreen col-12 col-md-10 col-lg-8 offset-0 offser-md-1 offset-lg-2 p0');
    $('#me-section').addClass('me-container col-12 col-md-6 col-lg-6 col-xl-5 p0');
});
//On Mail Editor Fullscreen Button
$('#me-fullscreen').on('click', function(){
	$(".screen-overlay-dark").show();
	$(".me-body").show();
	$("#me-fullscreen").hide();
	$("#me-smallscreen").show();
	$('#me-section').removeClass('me-container col-12 col-md-6 col-lg-6 col-xl-5 p0');
    $('#me-section').addClass('me-container me-container-fullscreen col-12 col-md-10 col-lg-8 offset-0 offser-md-1 offset-lg-2 p0');
});	
//On Mail Editor SmallScreen Button
$('#me-smallscreen').on('click', function(){
	$(".screen-overlay-dark").hide();
	$(".me-body").show();
	$("#me-fullscreen").show();
	$("#me-smallscreen").hide();
	$('#me-section').removeClass('me-container me-container-fullscreen col-12 col-md-10 col-lg-8 offset-0 offser-md-1 offset-lg-2 p0');
    $('#me-section').addClass('me-container col-12 col-md-6 col-lg-6 col-xl-5 p0');
});	
	
// ================== Smart Page Application Js ================== //

/* Publish Page Calendar Hide show js */
$("#timeshow").hide();
        $("input[name='chkPassPort']").click(function () {
            if ($("#select-date").is(":checked")) {
                $("#timeshow").show();
			
            } else {
                $("#timeshow").hide();
            }
        });
		$("#Testingenddate").hide();
        $("input[name='EndDate']").click(function () {
            if ($("#select-datetime").is(":checked")) {
                $("#Testingenddate").show();
			
            } else {
                $("#Testingenddate").hide();
            }
        });
		$("#UpcomingContact").hide();
        $("input[name='includecontact']").click(function () {
            if ($("#includeContact").is(":checked")) {
                $("#UpcomingContact").show();
			
            } else {
                $("#UpcomingContact").hide();
            }
        });
		
		$("#Max-limit").hide();
        $("input[name='chkMaxlimit']").click(function () {
            if ($("#select-Maxlimit").is(":checked")) {
                $("#Max-limit").show();
			
            } else {
                $("#Max-limit").hide();
            }
        });

        $("#SpecificLocation,#SatisfyLocation").hide();
        $("input[name='location']").click(function () {
            if ($("#OnSpecificLocation").is(":checked")) {
                $("#SpecificLocation,#SatisfyLocation").show();
			
            } else {
                $("#SpecificLocation,#SatisfyLocation").hide();
            }
        });
		
		// New Package Feature’s Price Options Select
		
		$("#hidden_fields_Two,#hidden_fields_Three").hide();
        $("input[name='subcprice']").click(function () {
            if ($("#paid-subscription").is(":checked")) {
                $("#hidden_fields_one").show();
                $("#hidden_fields_Two,#hidden_fields_Three").hide();
			
            } else if  ($("#one-time-prices").is(":checked")) {
				$("#hidden_fields_Two").show();
				$("#hidden_fields_Three,#hidden_fields_one").hide();
            }
			else if  ($("#free-subc").is(":checked")) {
                $("#hidden_fields_one,#hidden_fields_Two").hide();
				$("#hidden_fields_Three").show();
            }
			 else {
                $("#hidden_fields_one,#hidden_fields_Two,#hidden_fields_Three").hide();
            }
        });
		
		// New Package Select certain duration
		$("#certainduration").hide();
        $("input[name='trialdur']").click(function () {
            if ($("#trialduration").is(":checked")) {
                $("#certainduration").show();
			
            } else {
                $("#certainduration").hide();
            }
        });
		
		// New Package Select DropDown duration
		$("#show-duration").hide();
		$('#durationselect').on('change', function() {
		  if ( this.value == '1')
		  {
			$("#show-duration").show();
		  }
		  else
		  {
			$("#show-duration").hide();
		  }
		});
		
//SMART Mail Application js
//Add Field Toggler
    $('.add-field-toggler').click( function(event){
        $('.add-field-toggler i').toggleClass('icon-cross f-12');
    });

    $(document).click( function(){
        $('.add-field-toggler i').removeClass('icon-cross f-12');
    }); 

	// Mailing List checkbox label color changed when checked
	 $(function()
	{
	  $('.mailing-group-list li input').change(function()
	  {
		if ($(this).is(':checked')) {
			$(this).closest('li').find('.label-color').addClass('vd-gblue-clr');
		}else{
			$(this).closest('li').find('.label-color').removeClass('vd-gblue-clr');
		}
	  });
	});
	
	// Mailing List Switch
	$(".quick-mailing-group").hide();
	  $("input[name='mailing']").click(function () {
            if ($("#mailing1").is(":checked")) {
                $(".quick-mailing-group").hide();
                $(".contact-manually-group").show();
			
            } 
			 else {
                $(".quick-mailing-group").show();
                $(".contact-manually-group").hide();
            }
        });
	
$(function() {
  $('#advertismentType').change(function(){
    $('.advertisment-block').hide();
    $('#' + $(this).val()).show();
  });
});
	
	
//------ Stickey Footer js ----------//
//$(document).click(function(){
//	   stick();
//	});
//stick();
//function stick(){
//	setTimeout(function(){ 
//		if ($("body").height() < $(window).height()) {
//			$('.footer-design').addClass("footer-stickey");
//		}
//		if ($("body").height() > $(window).height()) {
//			$('.footer-design').removeClass("footer-stickey");
//		}
//	}, 300);
//}

	
// Customer Goal Select Dropdown //
	$(".dropdown-menu li a.select-dropvalue").click(function(){
  var selText = $(this).text();
  $(this).parents('.dropas-select').find('.dropdown-toggle').html('<span class="caret-right">'+selText+'</span>');
	});
	
	
// Customer Goal Select Dropdown //
	$(".dropdown-menu li a.selected-value").click(function(){
	  setCustomeDropdown($(this));
	});
	function setCustomeDropdown(object){
		var selText = object.text();
		object.closest('.custom-drop-down').find('input').val(object.attr('field-value'));
		object.parents('.dropvalue-select').find('.dropdown-toggle').html('<span class="caret-right">'+selText+'</span>');
	}
	$(function(){
		$('.custom-dropdown-input').filter(function(){
			var inputValue = $(this).val();
			setCustomeDropdown($(this).closest('.custom-drop-down').find('[field-value="'+inputValue+'"]'));
		})
	})

	// Select option on select div show engage ab testing page //
	    $(".onselectoption").change(function(){

        $(this).find("option:selected").each(function(){

            var optionValue = $(this).attr("value");

            if(optionValue){

                $(".timeshow").not("." + optionValue).hide();

                $("." + optionValue).show();

            } else{

                $(".timeshow").hide();

            }

        });

    }).change();
	
	  $(".onselectoption1").change(function(){

        $(this).find("option:selected").each(function(){

            var optionValue = $(this).attr("value");

            if(optionValue){

                $(".timeshow1").not("." + optionValue).hide();

                $("." + optionValue).show();

            } else{

                $(".timeshow1").hide();

            }

        });

    }).change();
	
	 $(".onselectoption2").change(function(){

        $(this).find("option:selected").each(function(){

            var optionValue = $(this).attr("value");

            if(optionValue){

                $(".timeshow2").not("." + optionValue).hide();

                $("." + optionValue).show();

            } else{

                $(".timeshow2").hide();

            }

        });

    }).change();
	
	     
	$(".campaign-active").click(function(){
		$(this).find('span').text(function(i, v){
			return v === 'Active' ? 'Inactive' : 'Active'
		});
		$(this).find('i').toggleClass('icon-enable icon-disable');
		$(this).toggleClass('inactive-btn');
	}); 
	
	// Location tab header check box 
	 $('.small-radio-btn a').click(function() {
		$(this).find('input').click();
	});
	$('.small-radio-btn input').click(function(e) {
		e.stopPropagation(); //store the value of the checkbox ...
	});
	
	//  country city data table 
	$("#show-city-table").hide();
	$("#show-State-table").hide();
    $(".country-select").click(function(){
         $("#show-city-table").show();
		  $("#hide-country-table").hide();
		  $("#CountriesName").append(" <li class='state-show'><a class='cityclick' href='#'>India</a></li>");
    });
		$(".city-select").click(function(){
         $("#show-State-table").show();
		  $("#show-city-table").hide();
		  $("#CountriesName").append(" <li>Tamil Nadu</li>");
    });
	$("#CountriesName li:nth-child(1)").click(function(){
         $("#show-city-table,#show-State-table").hide();
		  $("#hide-country-table").show();
		  $("#CountriesName li").slice(1).remove();
    });
	$(document).on('click', '.cityclick', function(){ 
         $("#show-State-table").hide();
		 $("#show-city-table").show();
		 $("#CountriesName li").slice(2).remove();
    });
	
/* Bootstrap 4 Multilevel Dropdwon Menu js */	
	(function($){
	$('.smart-nav-area .dropdown-menu a.dropdown-toggle').on('click', function(e) {
	  if (!$(this).next().hasClass('show')) {
		$(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
	  }
	  var $subMenu = $(this).next(".dropdown-menu");
	  $subMenu.toggleClass('show');

	  $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
		$('.dropdown-submenu .show').removeClass("show");
	  });

	  return false;
	});
})(jQuery)
	
	
/* Dashboard Drag & Drop Js */
$(function(){
	$("#sortable").sortable({handle:".drag-picker",containment:"parent",tolerance:"pointer"});
});


/* Expand & Collapse Dragable box Js */
$(".minmaxwindow-btn").click(function(){
	$(".minmaxwindow").toggleClass("col-md-6");
	$("a.minmaxwindow-btn>i").toggleClass("icon-expand-column icon-collapse-column");
});
$(".maxminwindow-btn").click(function(){
	$(".maxminwindow").toggleClass("col-md-12 col-md-6");
	$("a.maxminwindow-btn>i").toggleClass("icon-collapse-column icon-expand-column");
});

$(".minmaxwindow-btn1").click(function(){
	$(".minmaxwindow1").toggleClass("col-md-6");
	$("a.minmaxwindow-btn1>i").toggleClass("icon-expand-column icon-collapse-column");
});
$(".maxminwindow-btn2").click(function(){
	$(".maxminwindow2").toggleClass("col-md-12 col-md-6");
	$("a.maxminwindow-btn2>i").toggleClass("icon-collapse-column icon-expand-column");
});

// Bootstrap Slider Range js //
if($('#ex1').length){
$('#ex1').slider({
	formatter: function(value) {
		return value + '%';
	}
});
}


});


$(window).scroll(function(){
	if ($(this).scrollTop() > 150) {
        $('#videostickydiv.stickWithStatusBar').addClass('sticky-video1');
    } else {
        $('#videostickydiv.stickWithStatusBar').removeClass('sticky-video1');
    }
});


// Video Sticky js //
 $(window).scroll(function(){
      if ($(this).scrollTop() > 165 && $("#videosticky").height() < 480 && $(this).height() > 610) {
          $('#videosticky').addClass('sticky-video');
      } else {
          $('#videosticky').removeClass('sticky-video');
      }
	 
	 Videofixsticky();
	  
	  if ($(this).scrollTop() > 150) {
          $('#librarysticky').addClass('sticky-video');
      } else {
          $('#librarysticky').removeClass('sticky-video');
      }
	  
  });

// Our Video Box Stickey //
  Videofixsticky = function () {
	if($('.video-sticky-height').length){
	
	var windowheight = screen.height;
	var scrollPosSub = $('.video-sticky-height').offset().top;	
	var offsetData1 = $('.footer-design').offset().top + windowheight/2 - 188;
	
	var scrollTop2 = $(window).scrollTop();
	var scrollTop3 = $(window).scrollTop() + windowheight;
	if (scrollTop2 >= scrollPosSub) {	
	
	$('#videostickydiv').addClass('sticky-video');
	
	if (scrollTop3 > offsetData1) {				
	$('#videostickydiv').removeClass('sticky-video');						
	}	
	} 
	else {		
	$('#videostickydiv').removeClass('sticky-video');	
	}
	}
};Videofixsticky();

// Installation Div Hide Show 
  
$('#SmartScriptdiv').hide();
$('.smart-script-toggle').hide();
$('#SelectScript').click(function(){
      $('#SmartScriptdiv').toggle();
      $('.smart-script-toggle').toggle();
  });


// score-rule page bydefault open accordion tabs //
$(".card-header.collapsed").click(function(){
    $(this).removeClass("radiusb0");
});


//Segment Graph & Add New Contacts OnScroll Sticky
window.onscroll = function() {
	SegmentDonutScroll();
	profilefixed();
};

function SegmentDonutScroll() {
if($('#segment-donut-chart').length){
var stickyelement = document.getElementById("segment-donut-chart");
var sticky = 250;
  if (window.pageYOffset >= sticky) {
    stickyelement.classList.add("sticky-donut")
  } else {
    stickyelement.classList.remove("sticky-donut");
  }
}
};

function profilefixed() {
if($('#AddContacsSticky').length){
var profilesticky = document.getElementById("AddContacsSticky");
var newsticky = 250;
  if (window.pageYOffset >= newsticky) {
	profilesticky.classList.add("add-contacts-sticky")
  } else {
	profilesticky.classList.remove("add-contacts-sticky");
  }
}
};


window.addEventListener("message", function(event){
	onScrollEvent();
}, false);

function onScrollEvent(){
		var link = $('.page_push_down');
		var offset = link.offset();
		if(offset==undefined){
			bottom = '0px';
		}else{
			var bottom = offset.top + link.outerHeight() - $(window).scrollTop();
			bottom = bottom > 0 ? bottom : '0px';
		}
		
		var sticky = $('.sticky-fix'),
			scroll = $(window).scrollTop();
		if (scroll > 0) {
			if (!$('.virtual-header').length) {				
				$virtual = $('<div class="virtual-header">');
				$virtual.css({
					'width': '100%',
					'height': sticky.css('height'),
					'position': 'relative'
				});
				sticky.after($virtual);
			}
			sticky.css({
				'position': 'fixed',
				// 'top': '0',
				'top': bottom,
				'width': '100%',
				'z-index': '1089'
			});
		}
		setTimeout(function(){
			if(typeof $("header").offset() !== 'undefined'){
			$('.social-share-bar').css({
				'top': (parseInt($("header").offset().top) - $(window).scrollTop() + 160)+'px',
			});
			}
		},50);
		
		
}

// MyDrive Modal Copy URL JS
$('.resolution-list-view').change(function(){
	if ($("#Original-Select1").is(":checked")) {
	   $(".copy-link-show").hide();
	   $(this).closest('.resolution-list-view').find('.copy-link-show').show();
	} else if  ($("#High-Definition-Select").is(":checked")) {
		$(".copy-link-show").hide();
	   $(this).closest('.resolution-list-view').find('.copy-link-show').show();
	}
	else if  ($("#Standard-Select").is(":checked")) {
	   $(".copy-link-show").hide();
	   $(this).closest('.resolution-list-view').find('.copy-link-show').show();
	}
	else if  ($("#Large-Select").is(":checked")) {
	   $(".copy-link-show").hide();
	   $(this).closest('.resolution-list-view').find('.copy-link-show').show();
	}
	else if  ($("#Medium-Select").is(":checked")) {
	   $(".copy-link-show").hide();
	   $(this).closest('.resolution-list-view').find('.copy-link-show').show();
	}
	else if  ($("#Small-Select").is(":checked")) {
	   $(".copy-link-show").hide();
	   $(this).closest('.resolution-list-view').find('.copy-link-show').show();
	}
});

 $('.no-collapsable').on('click', function (e) {
   e.stopPropagation();
});



 $(document).ready(function(){
	 // Show cheked content -step-one
  $('.show-cheked').click(function(){   
	 $(this).addClass('active').siblings().removeClass('active');
  });
  // Left Aling animation model
  $("#backToFirstModal").click(function(){
		$(".afterslide-left").addClass("newModal");
	})
	$(".campaign-toggle").click(function(){
		$(".afterslide-left").removeClass("newModal");
	})
	
});


// Design selection page Sticky js //
 $(window).scroll(function(){
      if ($(this).scrollTop() > 140) {
          $('.side-tab-fixed').addClass('fixed-tab');		
          $('.sticky-design-selection').addClass('fixed-filter');		
     	 } else {
          $('.side-tab-fixed').removeClass('fixed-tab'); 
          $('.sticky-design-selection').removeClass('fixed-filter'); 
	  }
	  
  });
  
  
/* Footer Feedback */
$(document).ready(function(){
	$(".footer-fb-link").click(function(){
		$(".footer-fb-desc").addClass("show-fb-footer");
		$('.footer-fb-link').addClass("fb-hide-btn");
	});
	$(".footer-fb-icon").click(function(){
		$(".footer-fb-desc").removeClass("show-fb-footer");
		$('.footer-fb-link').removeClass("fb-hide-btn");
	});
});

// Accordion Tooltip 
$(document).ready(function(){
    $(document).on( "click", ".dcp-accordion-tooltip", function(e) {       
        e.stopPropagation();
    });   
});

/* pay action script */
$(document).ready(function () {
	$('.first-block').click(function() {
		$('#dcpDashboardAccordion').show();
		$('#dcpBlankAccordion').hide();
	});
	$('.second-block').click(function() {
		$('#dcpDashboardAccordion').hide();
		$('#dcpBlankAccordion').show();
	});
});

// Dashboard Scroll Top Active Accordion
$('#dcpDashboardAccordion .collapse').on('show.bs.collapse', function(e) {
  var $card1 = $(this).closest('.card');
  var $open1 = $($(this).data('parent')).find('.collapse.show');
  var additionalOffset1 = 0;
  if($card1.prevAll().filter($open1.closest('.card')).length !== 0)
  {
        additionalOffset1 =  $open1.height();
  }
  $('html,body').animate({
    scrollTop: $card1.offset().top - additionalOffset1 - 100
  }, 1000);
});

//  Membership Page Publish Dropdown JS
$(document).ready(function () {
	$(document).on('click', '.drop-publish-btn', function(){ 
		$('.publish-dropdown-menu').toggle();
		$('.drop-publish-btn').toggleClass('active');
	});
	$('*').click(function(e){
		if (e.target != this)return;
		if(!$(this).closest('.drop-publish-btn').length && !$(this).closest('.publish-dropdown-menu').length){
			$('.publish-dropdown-menu').hide();
			$('.drop-publish-btn').removeClass('active');
		}	
	});
});
// Membership type add variant subscription 
$(document).ready(function () {
	$(".producttrialvalue").hide();
	$('#producttrial').click(function() {
		if($(this).is(":checked")) {
			$('.producttrialvalue').show();
		} else {
			$('.producttrialvalue').hide();
		}
	});
});
$(document).ready(function () {
	$(".producttrial_value").hide();
	$('#product_trial').click(function() {
		if($(this).is(":checked")) {
			$('.producttrial_value').show();
		} else {
			$('.producttrial_value').hide();
		}
	});
});
// Digital Product type add variant
$(document).ready(function () {
	$(".producttrial_value").hide();
	$('#product_trial').click(function() {
		if($(this).is(":checked")) {
			$('.producttrial_value').show();
		} else {
			$('.producttrial_value').hide();
		}
	});
});
$(document).ready(function () {
	//$(".view_images").hide();
	$('#view_images').click(function() {
		if($(this).is(":checked")) {
			$('.view_images').show();
		} else {
			$('.view_images').hide();
		}
	});
});

// Switch Toggle btn Status Js 
$(function () {           
	   $(".switch-toggle-sm").filter(function(){
			if ($(this).find('input').is(":checked")) {
				$(this).closest(".switch-toggle-sm-parent").find(".statusactive").show();
				$(this).closest(".switch-toggle-sm-parent").find(".statusinactive").hide();
			} else {
				$(this).closest(".switch-toggle-sm-parent").find(".statusactive").hide();
				$(this).closest(".switch-toggle-sm-parent").find(".statusinactive").show();
			}
	   })
	   $(".switch-toggle-sm").change(function () {
		   if ($(this).find('input').is(":checked")) {
			   $(this).closest(".switch-toggle-sm-parent").find(".statusactive").show();
			   $(this).closest(".switch-toggle-sm-parent").find(".statusinactive").hide();
		   } else {
			   $(this).closest(".switch-toggle-sm-parent").find(".statusactive").hide();
			   $(this).closest(".switch-toggle-sm-parent").find(".statusinactive").show();
		   }
	   });
   });

$(document).ready(function(){ 
   // Membership Page Pricing JS
   $("input[name$='pricingtype']").click(function() {
        var pricing = $(this).val();
        $("div.pricing-type").hide();
        $("."+pricing).show();
    });
   $("input[name$='checkpublish']").click(function() {
        var publish1 = $(this).val();
        $("div.publish-type").hide();
        $("."+publish1).show();
    });
	//Publish Dropdown JS
   $("input[name$='product_status']").click(function() {
        var productstatus = $(this).val();
        $("div.product-status").hide();
        $("."+productstatus).show();
    });
	
	// CheckBox JS
	$('#producttrial1').click(function() {
		if( $(this).is(':checked')) {
			$(".product-trial").show();
		} else {
			$(".product-trial").hide();
		}
	});
	// CheckBox JS
	$('#producttrial2').click(function() {
		if( $(this).is(':checked')) {
			$(".product-trial1").show();
		} else {
			$(".product-trial1").hide();
		}
	});
	// SEO Snippet Preview JS
	$(".snippet-edit, .category-add").hide();
	$(".snippet-after-edit,.category-new-add").click(function() {
		$(".snippet-preview-box").hide();
		$(".snippet-edit").show();
		$(".category-add").show();
	});
	$(".snippet-preview, .category-new-hide").click(function() {
		$(".snippet-preview-box").show();
		$(".snippet-edit").hide();
		$(".category-add").hide();
	});
	// New catgory Add JS
	$(".category-add").hide();
	$(".category-new-add").click(function() {
		$(".category-add").show();
	});
	$(".category-new-hide").click(function() {
		$(".category-add").hide();
	});
});

// Campaigns Project Select JS
$(document).ready(function(){ 
	$('.folders-top-right-overlay input:checkbox').change(function(){
		if($(this).is(":checked")) {
			$(this).parent().closest('.folders-block').addClass("selected_folders");
		} else {
			$(this).parent().closest('.folders-block').removeClass("selected_folders");
		}
	});
	$('input.all_folder_select:checkbox').change(function(){
		if($(this).is(":checked")) {
			$('.folders-block').addClass("selected_folders");
		} else {
			 $('.folders-block').removeClass("selected_folders");
		}
	});
});

// Admin Bar JS
$(document).ready(function(){ 
	$(document).on('click', '.show-header', function(){ 
		$(this).removeClass('show-header');
		$(this).addClass('hide-header');
		$('.dcp-admin-header').removeClass('header-hidden');
		$('.dcp-admin-header-fixed-mrgn').removeClass('remove-fixed-mrgn');
		$(this).find(".admin-menu-bar-tooltip").html('Hide Bar');
	});
	$(document).on('click', '.hide-header', function(){ 
		$(this).addClass('show-header');
		$(this).removeClass('hide-header');
		$('.dcp-admin-header').addClass('header-hidden');
		$('.dcp-admin-header-fixed-mrgn').addClass('remove-fixed-mrgn');
		$(this).find(".admin-menu-bar-tooltip").html('Show Bar');
	});
});

// Calendar disabled JS
$(function(){
  $('#NeverExpires').change(function(){
	if ($(this).is(':checked')) {
		$('.disabled-calendar-btn').addClass("disabled_calendar");
		$('.disabled-calendar-input').attr("disabled", true);
	}else{
		$('.disabled-calendar-btn').removeClass("disabled_calendar");
		$('.disabled-calendar-input').attr("disabled", false);
	}
  });
});
$(document).ready(function(){
  $(".disabled_calendar").on('click', function (event) {
	event.stopPropagation()
  });
});