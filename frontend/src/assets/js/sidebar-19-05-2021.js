// DCP Menu JS Start
$(document).on('click', '.hide-menu-btn', function(){ 
	$(this).addClass('show-left-menu-btn');
	$(this).removeClass('hide-menu-btn');
	$(this).find(".menu-bar-tooltip").html('Open Menu');
	
	$('.dcp-left-bar').addClass('dcp-left-bar-hide');
	$('.dcp-container-wrap').addClass('left-bar-closed'); // Main Container JS
	// tablet and mobile JS
	$('#menu_content').removeClass('hide-left-bar-div');                              
	$('.dcp-left-bar').removeClass('dcp-left-bar-show-xs');
	
	// Desktop View Left bar js
	$('.dcp-left-bar').removeClass('dcp-left-bar-show-lg');
	$('#menu_content').removeClass('show-left-bar-div-lg');
});	
$(document).on('click', '.show-left-menu-btn', function(){ 
	$(this).removeClass('show-left-menu-btn');
	$(this).addClass('hide-menu-btn');
	
	$(this).find(".menu-bar-tooltip").html('Close Menu');
	$('.dcp-left-bar').removeClass('dcp-left-bar-hide');
	$('.dcp-container-wrap').removeClass('left-bar-closed'); // Main Container JS
	
	// tablet and mobile JS
	$('.dcp-left-bar').addClass('dcp-left-bar-show-xs');
});	
$(document).ready(function() { 
	$('.menu-tab-item').click(function(){
		$('.dcp-container-wrap').addClass('left-bar-menu-open'); // Main Container JS
		$('#menu_content').addClass('show-left-bar-div'); // Second Level menu
		$('#menu_content').removeClass('hide-left-bar-div'); // Second Level menu
		$('.menu-btn-toggle').addClass('close-black-bg'); // menu Btn
		$(".left-bar-dropdown-menu").hide();
	});
});
$(document).on('click', '.close-black-bg', function(){ 
	$(this).removeClass('close-black-bg');
	$(this).addClass('show-white-bg');
	$('#menu_content').addClass('hide-left-bar-div');
});	
$(document).on('click', '.show-white-bg', function(){ 
	$(this).removeClass('show-white-bg');
	$(this).addClass('close-black-bg');
	$('#menu_content').addClass('show-left-bar-div');
	$('#menu_content').removeClass('hide-left-bar-div');
});

// tablet and mobile JS
$(document).on('click', '.xs-menu-toggle-btn', function(){ 
	$(this).removeClass('xs-menu-toggle-btn');
	$('.dcp-left-bar').addClass('dcp-left-bar-show-xs');
});

// Left Bar DropDown Toggle JS
$(".menu-list-btn").click(function() {

	if ($('.menu-dropdown-item').hasClass('active')){
		$('.menu-dropdown-item').removeClass('active');
	}
});
$(".menu-dropdown-item").click(function() {
   var dropdown_menu_item = $(this).attr("id");
   $(".left-bar-dropdown-menu").not("."+dropdown_menu_item).hide();
   $("."+dropdown_menu_item).toggle();
   $('.menu-dropdown-item').removeClass('active');
   $(this).addClass('active');
});
$(".menu-btn-toggle").click(function() {
   $(".left-bar-dropdown-menu").hide();
});
$(document).ready(function () {
$('*').click(function(e){
	if (e.target != this)return;
	if(!$(this).closest('.menu-dropdown-item').length && !$(this).closest('.left-bar-dropdown-menu').length){
		$('.left-bar-dropdown-menu').hide();
		if ($('.menu-dropdown-item').hasClass('active')){
		$('.menu-dropdown-item').removeClass('active');
		}
	}
});
});


$('#menu_content').on('click', function (event) {
	event.stopPropagation();
});
$('.editor-publish-dropdown-menu').on('click', function (event) {
	event.stopPropagation();
});
// Left Bar DropDown Toggle JS End
// Tablet and Mobile JS
$(document).ready(function () {
	if ($(window).width() <= 991){
		$('*').click(function(e){
			if (e.target != this)return;
			if(!$(this).closest('.menu-btn-toggle').length && !$(this).closest('.dcp-left-bar').length && !$(this).closest('#menu_content').length && !$(this).closest('.left-bar-dropdown-menu').length){
				$('#menu_content').removeClass('show-left-bar-div');
				$('#menu_content').removeClass('hide-left-bar-div');
				$('.dcp-left-bar').removeClass('dcp-left-bar-show-xs');
				$('.menu-btn-toggle').removeClass('hide-menu-btn').removeClass('show-white-bg').removeClass('close-black-bg').addClass('show-left-menu-btn').addClass('xs-menu-toggle-btn');
				$('.dcp-left-bar').removeClass('dcp-left-bar-show-xs');
				$('.left-bar-dropdown-menu').hide();
			}
		});
		$(document).on('click', '.hide-menu-btn', function(){ 
			$('#menu_content').removeClass('show-left-bar-div').removeClass('hide-left-bar-div');
			$('.dcp-left-bar').removeClass('dcp-left-bar-show-xs');
			$(this).removeClass('hide-menu-btn').addClass('show-left-menu-btn');
			
		});	
	}
});
// DCP Menu JS End

$(document).ready(function () {
	$(document).on('click', '.publish-btn', function(){ 
		$('.editor-publish-dropdown-menu').toggle();
		$('.publish-btn').toggleClass('active');
	});
	$('*').click(function(e){
		if (e.target != this)return;
		if(!$(this).closest('.publish-btn').length && !$(this).closest('.editor-publish-dropdown-menu').length){
			$('.editor-publish-dropdown-menu').hide();
			$('.publish-btn').removeClass('active');
		}	
	});
});