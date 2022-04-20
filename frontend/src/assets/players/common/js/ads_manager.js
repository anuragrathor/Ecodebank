var skipAllowIframe = false;
var skipAllowAnotation = false;
$(document).ready(function () {
	VideoAction_setInterval();
});
function iframeFunction(iframeId){
	return document.getElementById(iframeId).contentWindow;
}
function VideoAction_setInterval(){
	time_update_interval = setInterval(function () {
		if(!actionStatus){
			$.each(actionList, function( index, value ){
				if(value.time_start < currentTime()){
					actionList.splice(index, 1);
					displayActionIframe(value);
					return false;
				}
			});
		}	
	}, 200);
}
function displayActionIframe(action){
	if(action.type=='AT' || action.type=='AI' ||  action.type=='AS'){
		$.get(ctr_base_url+'action_anotation/'+action.id,
		function(data, status){
			$('#annotation-html').html(data);
			$('.annotation-bar').show();
			skipAllowAnotation = false;
			updateSkip(action, 'anotation');
		});
	}else{
		pauseVideo();
		actionStatus = true;
		skipAllowIframe = false;
		$('#gateframe').attr('src', ctr_base_url+'action_iframe/'+action.id);
		$('.gate-bar').show();
		$('#gateframe').on('load', function(){
			updateSkip(action, 'iframe');
		});
	}
}
$(document).on('click', '.close-btn', function () {
	if(skipAllowIframe){
		$('.gate-bar').hide();
		actionStatus = false;
		skipAllowIframe = false;
		playVideo();
	}
});
$(document).on('click', '.close-btn-anotation', function () {
	if(skipAllowAnotation){
		$('.annotation-bar').hide();
		skipAllowAnotation = false;
	}
});
function updateSkip(action, type){
	if(type=='anotation'){
		var $skipBtn = $('.close-btn-anotation');
	}else{
		var $skipBtn = $('.close-btn');
	}
	var skiptime = action.skip_min_time;
	var startSkip =setInterval(function () {
		$skipBtn.html("skip in "+skiptime);
		if(skiptime < 0){
			$skipBtn.html("x");
			clearInterval(startSkip);
			if(type=='anotation'){
				skipAllowAnotation = true;
			}else{
				skipAllowIframe = true;
			}
		}
		skiptime--;
	}, 1000);
}
