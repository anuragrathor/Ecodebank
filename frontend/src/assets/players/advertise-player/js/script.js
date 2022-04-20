function ID(id){
	return document.getElementById(id);
}

$( document ).ready(function() {
//Range slider for volume and seek slide start
	$('#progress-bar').slider();
	$("#Volume-bar").slider({reversed : true});
	
	setTimeout(function(){ 
		$("#ex1Slider").find(".slider-track-low")
		.after('<div style="left: 0%; width: 0%; background-color:rgba(0,0,0,0.5); height: 100%;" id="Btime-bar"></div>')
		.after('<div id="actiontime-bar" style="width:100%;"></div>');
	}, 100);	
//Range slider for volume and seek slide end

//controls hide show on mouse event js start
	var mouse_move_time = 0;
	var mouse_event_interval;
	setOpacity(0);
	$(document).mouseleave(function(event){
		setOpacity(0);
	});
	$(document).mousemove(function(event){
        mouse_move_time = 0;
		clearInterval(mouse_event_interval);
		setOpacity(1);
        mouse_event_interval = setInterval(function(){
					mouse_move_time++;
					if(mouse_move_time >= 5){ 
						setOpacity(0);
					}
				}, 1000);
	});
	function setOpacity(opacity){
		return;
		if(opacity){
			$(".top-bar-layout").removeClass('top-control-hidden');
			$(".top-bar-layout").addClass('top-control-show');
			
			$(".bottom-bar-layout").removeClass('bottom-control-hidden');
			$(".bottom-bar-layout").addClass('bottom-control-show');
		}
		else{
			$(".top-bar-layout").removeClass('top-control-show');
			$(".top-bar-layout").addClass('top-control-hidden');
			
			$(".bottom-bar-layout").removeClass('bottom-control-show');
			$(".bottom-bar-layout").addClass('bottom-control-hidden');
			}
	}
//controls hide show on mouse event js end

});


//setting tabs start
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
//setting tabs end
	
function FrontDispaly(action){
	if(action=="play"){
		$(".play-pause-btn").addClass('min').attr("onclick", "pauseVideo()");
		$(".ceneter-play-btn").hide();
	}
	else if(action=="pause"){
		$(".play-pause-btn").removeClass('min').attr("onclick", "playVideo()");
		$(".ceneter-play-btn").show();
		$('.loadwaiting').hide();
	}
}