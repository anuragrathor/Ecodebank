var rangeActive = false;
	
	function ID(id){
		return document.getElementById(id);
	}
	$(document).ready(function () {
		setTheme();
		resetForms();
		Playerinitialize();
		SubtitleInitialize();
		setActionbar();
	});

	


	var activeOption = '';
	var blurevent;
	var clickevent;
	function setOptions(optionsType){
		clearTimeout(blurevent);
		clickevent = true;
		if(optionsType=='options'){
			if(activeOption!="options"){
				$('.Setting').slideUp();
				$('.options').slideDown();
				$(".optionsindex").focus();
				activeOption = 'options';
				clickevent = false;
			}else{
				$('.Setting').slideUp();
				activeOption = '';
			}
		}
		else{
			if(activeOption!=optionsType){
				$('.Setting').slideUp();
				$('.'+optionsType).slideDown();
				$("."+optionsType).focus();
				activeOption = optionsType;
			}else{
				$('.Setting').slideUp();
				$('.options').slideDown();
				$(".optionsindex").focus();
				activeOption = 'options';
			}
		}
		
	}
	$('.Setting').on('blur', function (e){
		blurevent = window.setTimeout( 
			function(){
				if(!clickevent){
					$('.Setting').slideUp();
					activeOption = '';
				}
				clickevent = false;
			}
			, 200 );
	});

	// Toogle Password //
	$(".toggle-password").click(function () {
		$(".toogle-icon").toggleClass("icon-hide icon-show");
		var input = $($(this).attr("toggle"));
		if (input.attr("type") == "password") {
			input.attr("type", "text");
		} else {
			input.attr("type", "password");
		}
	});
	
	
	


	
	
	
	
	
	
	
	
	
	