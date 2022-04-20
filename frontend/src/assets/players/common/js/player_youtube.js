var PlayerState;
var rangeActive = false;

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function currentTime(){
	// Object { UNSTARTED: -1, ENDED: 0, PLAYING: 1, PAUSED: 2, BUFFERING: 3, CUED: 5 }
	if(PlayerState == undefined){return 0; 	}
	return player.getCurrentTime();
}
function durationTime(){
	duration = player.getDuration()
	if(duration == undefined){return 1;}
	return player.getDuration();
}

function onYouTubeIframeAPIReady(){
	player = new YT.Player('player', {
		width: '100%',
		'videoId' : youtubeVideoId,
		playerVars: {
			controls: 0,
			modestbranding:0,
			showinfo:0,
			loop : 1,
			rel : 1,
			iv_load_policy : 3,
		},
		events: {
			'onReady': initialize,
			'onStateChange': PlayerStateChange,
			// 'onPlaybackQualityChange':CheckVideoQuatilychanged
		}
		
	});
}
function initialize(){
	if(playerTheme.start_event == 'autoplay'){
		playVideo();
	}
	var stopYTStartButtom = true; //used to remove YT starting play button
	time_update_interval = setInterval(function (){	
		updateTimerDisplay();
		updateProgressBar();
		updateSubTitleBar();
	}, 200);
}
function updateTimerDisplay(){
	if(PlayerState == 3){return;}
	$('#current-time').text(formatTime( currentTime() ));
	$('#duration-time').text(formatTime( durationTime() ));
}
function updateProgressBar(){
	if(PlayerState == 3){return;}
	if(rangeActive){return;}
	relative_time = currentTime() / durationTime();
	$("#progress-bar").slider("setValue", relative_time*100);
	$('#Ctime-bar').css("width", (relative_time * 100)+'%');
	$('#Btime-bar').css("width", (player.getVideoLoadedFraction()*100)+'%');
}
		
function playVideo() {
	player.playVideo();
	FrontDispaly('play');
	VideoStatUpdate_Play();
}
function pauseVideo() {
	player.pauseVideo();
	FrontDispaly('pause');
	VideoStatUpdate_Pause();
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

function seekToVideo(newTimePercent) {
	var newTime = player.getDuration() * (newTimePercent / 100);
	player.seekTo(newTime);
	VideoStatUpdate_changeseek(newTime);
	subcount = 0;
}
function setVolume(newVolume) {
	player.setVolume(newVolume);
	$('#Volume-bar-active').css("width", (newVolume*80/100)+"px");
	$('#Volume-bar').val(newVolume);
	if(newVolume==0){
		$("#Volume-icon").html('<img src="'+RelativeRootPath+'images/Volume-mute.png" onclick="setVolume(100)"; style="height:100%;">');
	}else{
		$("#Volume-icon").html('<img src="'+RelativeRootPath+'images/Volume.png" onclick="setVolume(0)"; style="height:100%;">');
	}
}
	
function PlayerStateChange(e){  //used to set video end action loop/stopfirst/stoplast
	PlayerState = e.data;

	if(PlayerState == 3){
		$('.loadwaiting').show();
	}else{
		$('.loadwaiting').hide();
	}
	
	if(PlayerState == 0 || player.getDuration() - player.getCurrentTime() < 1){
		if(playerTheme.end_event == "first_frame"){
			seekToVideo(0);
			pauseVideo();
		}		
		if(playerTheme.end_event == "loop"){
			seekToVideo(0);
			playVideo();
		}
	}
}


