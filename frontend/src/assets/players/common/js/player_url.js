var rangeActive = false;
function currentTime(){
	return ID("SAG-Video").currentTime;
}
function durationTime(){
	return ID("SAG-Video").duration;
}


$(document).ready(function () {
	PlayerControlsInitialize();
});
function PlayerControlsInitialize(){
	time_update_interval = setInterval(function () {
		updateTimerDisplay();
		updateProgressBar();
		updateSubTitleBar();
	}, 200);
}

function updateTimerDisplay(){
		if(ID("SAG-Video").readyState>2 || ID("SAG-Video").ended){
			$('#current-time').text(formatTime( ID("SAG-Video").currentTime ));
			$('#duration-time').text(formatTime( ID("SAG-Video").duration ));
		}
	}
function updateProgressBar(){
	if(!ID("SAG-Video").seeking || ID("SAG-Video").ended){
		if(!rangeActive){
			if(ID("SAG-Video").duration > 0){
				var relative_time = ID("SAG-Video").currentTime / ID("SAG-Video").duration;
			}
			else{
				var relative_time = 0;
			}
			
			if(ID("SAG-Video").readyState>2 || ID("SAG-Video").ended){
				$("#progress-bar").slider("setValue", relative_time*100);
				$('#Ctime-bar').css("width", (relative_time * 100)+'%');
			}
		}
	}
	for(var i=0; i<ID("SAG-Video").buffered.length; i++){
		if(ID("SAG-Video").currentTime > (ID("SAG-Video").buffered.start(i))){
			var BufferingPercent = ((ID("SAG-Video").buffered.end(i))/ID("SAG-Video").duration)*100;
		}
	}
	$('#Btime-bar').css("width", BufferingPercent+'%');
}

$('#progress-bar').on('mousedown', function() {
	rangeActive = true;
});
$('#progress-bar').on('mouseup', function() {
	rangeActive = false;
});
$('#progress-bar').on('mousemove', function() {
	return;
	if(rangeActive){
		$('#Ctime-bar').css("width", ($('#progress-bar').val())+"%");
		seekToVideo($('#progress-bar').val());
	}
});
$('#progress-bar').on('change', function() {
		$('#Ctime-bar').css("width", ($('#progress-bar').val())+"%");
		seekToVideo($('#progress-bar').val());
});
$('#Volume-bar').on('change', function () {
	setVolume($('#Volume-bar').val());
});
	
function playVideo(){
	ID("SAG-Video").play();
}
function pauseVideo() {
	ID("SAG-Video").pause();
}
function setVideoPlaybackRate(PlaybackRate){
	ID("SAG-Video").playbackRate = PlaybackRate
	$(".Speed").removeClass("active");
	var Speed = "normal";
	if(PlaybackRate == 0.5){Speed = 'slow';}
	if(PlaybackRate == 1.5){Speed = 'fast';}
	$("."+Speed).addClass("active");
}
function seekToVideo(newTimePercent){
	var newTime = ID("SAG-Video").duration * (newTimePercent / 100);
	if(!rangeActive){
		VideoStatUpdate_changeseek(newTime);
	}
	
	ID("SAG-Video").currentTime = newTime;
	subcount = 0;
}
function setVolume(newVolume){
	ID("SAG-Video").volume = newVolume/100;
	$('#Volume-bar-active').css("width", (newVolume*80/100)+"px");
	$('#Volume-bar').val(newVolume);
	if(newVolume==0){
		$("#Volume-icon").html('<img src="'+RelativeRootPath+ImageFolder+'/Volume-mute.png" onclick="setVolume(100)"; style="height:100%;">');
	}else{
		$("#Volume-icon").html('<img src="'+RelativeRootPath+ImageFolder+'/Volume.png" onclick="setVolume(0)"; style="height:100%;">');
	}
}


/* To hide player controls on mouse event */
var mouse_move_time = 0;
var mouse_event_interval;
$(document).ready(function(){
	if(playerTheme.start_event == 'autoplay'){
		playVideo();
	}
	ID("SAG-Video").onended  = function() {
		if(playerTheme.end_event == "first_frame"){
			ID("SAG-Video").currentTime=0;
		}		
		if(playerTheme.end_event == "loop"){
			playVideo();
		}
	};
	ID("SAG-Video").onwaiting = function() {
		$('.loadwaiting').show();
	};
	ID("SAG-Video").oncanplay = function() {
		$('.loadwaiting').hide();
	}
	ID("SAG-Video").ontimeupdate = function() {
		$('.loadwaiting').hide();
	}
	ID("SAG-Video").onplaying = function() {
		$('.loadwaiting').hide();
	}

});