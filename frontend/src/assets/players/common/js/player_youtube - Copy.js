function ID(id){
	return document.getElementById(id);
}
	// 2. This code loads the IFrame Player API code asynchronously.
	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	// 3. This function creates an <iframe> (and YouTube player)
	//    after the API code downloads.
	function onYouTubeIframeAPIReady() {
		player = new YT.Player('player', {
			width: '100%',
			'videoId' : VideoUrl,
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
				'onPlaybackQualityChange':CheckVideoQuatilychanged
			}
			
		});
	}
	$(document).ready(function () {
		setTheme();
		SubtitleInitialize();
	});
	function initialize(){
		setStat();
		VideoAction_setInterval();
		// Update the controls on load
		updateTimerDisplay();
		updateProgressBar();
		VideoPlayUpdate_setInterval();
		
		playerPrevCurrentTime = 0;
		VideoStatUpdate_setInterval();
		//player.playVideo();
		//FrontDispaly('play');
		if(onVideoStartEvent == 'AutoPlay'){
			playVideo();
		}
	}
	
	function VideoPlayUpdate_setInterval(){
		var stopYTStartButtom = true; //used to remove YT starting play button
		time_update_interval = setInterval(function () {
			if(player.getCurrentTime() > 0 && stopYTStartButtom){
				//player.pauseVideo();
				//FrontDispaly('pause');
				//$(".poster").show();
				stopYTStartButtom = false; //used to remove YT starting play button or used to setVideoQuatilylevels 
				//player.seekTo(0);
				setVideoQuatilylevels(); //set resolution list for YT.
			}
			
			updateTimerDisplay();
			updateProgressBar();
			updateSubTitleBar();
		}, 200);
	}
	
	var setQualityLevel;
	function setVideoQuatilylevels(){
		$.each(player.getAvailableQualityLevels(), function( index, value ) {
			var QualityLevelHTML = value.replace("large", "480p")
					.replace("medium", "360p")
					.replace("small", "240p")
					.replace("tiny", "144p");
			
			var QualityLevel = "'"+value+"'";
			$(".resolution").append('<div class="OptionList Quality '+value+'" onclick="setVideoQuatily('+QualityLevel+');"><span><b>'+QualityLevelHTML+'</b></span></div>');
		});
	}
	function setVideoQuatily(Quality){
		player.setPlaybackQuality(Quality);
		$(".Quality").removeClass("active");
		$("."+Quality).addClass("active");
		setQualityLevel = Quality;
	}
	function CheckVideoQuatilychanged(){
		if(setQualityLevel!=player.getPlaybackQuality()){
			setVideoQuatily(setQualityLevel);
		}
	}
	function setVideoPlaybackRate(PlaybackRate){
		player.setPlaybackRate(PlaybackRate);
		$(".Speed").removeClass("active");
		var Speed = "normal";
		if(PlaybackRate == 0.5){Speed = 'slow';}
		if(PlaybackRate == 1.5){Speed = 'fast';}
		$("."+Speed).addClass("active");
	}
	
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
/*	
myWindow = window;
myWindow.focus();
myWindow.onblur = function() {
pauseVideo();
};
*/

		
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
	function FrontDispaly(action){
		if(action=="play"){
			$(".PlayPause-bottom").html('<img src="'+RelativeRootPath+'images/pause.png" onclick="pauseVideo()" style="height:100%;">');
			$(".poster").hide();
			$(".Playfront").hide();
		}
		else if(action=="pause"){
			$(".PlayPause-bottom").html('<img src="'+RelativeRootPath+'images/play.png" onclick="playVideo()" style="height:100%;">');
			$(".Playfront").show();
		}
	}
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
			//console.log(newVolume);
			$("#Volume-icon").html('<img src="'+RelativeRootPath+'images/Volume-mute.png" onclick="setVolume(100)"; style="height:100%;">');
		}else{
			$("#Volume-icon").html('<img src="'+RelativeRootPath+'images/Volume.png" onclick="setVolume(0)"; style="height:100%;">');
		}
	}
	
	ID('Volume-bar').onchange = function () {
		setVolume($('#Volume-bar').val());
	}

	function updateTimerDisplay(){
		$('#current-time').text(formatTime( player.getCurrentTime() ));
		$('#duration-time').text(formatTime( player.getDuration() ));
	}
	function updateProgressBar(){
		$('#progress-bar').val((player.getCurrentTime() / player.getDuration()) * 100);
		$('#Ctime-bar').css("width", ((player.getCurrentTime() / player.getDuration()) * 100)+'%');
		$('#Btime-bar').css("width", (player.getVideoLoadedFraction()*100)+'%');
	}
	 // ID("progress-bar").onchange=function(){
		// console.log('change');
		// $('#Ctime-bar').css("width", ($('#progress-bar').val())+"%");
		// seekToVideo($('#progress-bar').val());
	// }
	// ID("progress-bar").oninput=function(){
		// console.log('change');
		// $('#Ctime-bar').css("width", ($('#progress-bar').val())+"%");
		// seekToVideo($('#progress-bar').val());
	// }
	function onseekchange(val){
		$('#Ctime-bar').css("width", val+"%");
		seekToVideo(val);
	}
	
/*
	$('#progress-bar').on('mouseup touchend', function (e) {
		var newTime = player.getDuration() * (e.target.value / 100);
		seekToVideo(newTime);
	});
*/
	function formatTime(time){
		time = Math.round(time);
		var minutes = Math.floor(time / 60),
		seconds = time - minutes * 60;
		seconds = seconds < 10 ? '0' + seconds : seconds;
		return minutes + ":" + seconds;
	}
		
	var screen_change_events = "webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange";
	var fullscreen_status = 0;
	$(document).on(screen_change_events, function () {
		fullscreen_status= 1-fullscreen_status;
		var fullscreen = document.getElementsByClassName('fullscreen');
		if(fullscreen_status){	
			$('.fullscreen-bottom')[0].src= RelativeRootPath+"images/FullScreenExit.png";
		}
		else{
			$('.fullscreen-bottom')[0].src= RelativeRootPath+"images/FullScreen.png";
		}
	});
	function fullscreen() {
		screenfull.toggle($('body')[0]);
	}

	function PlayerStateChange(e){  //used to set video end action loop/stopfirst/stoplast
		if(e.data==0 || player.getDuration()-player.getCurrentTime() < 1){
			seekToVideo(0);
			if(onVideoEndEvent == "stopfirst"){
				pauseVideo();
			}
		}
	}
	
	var addplaycount = true;
	function PostData(url, array, callback, requestdata){
		if(requestdata === undefined) { requestdata=''; }
		
		if(array.type=="playTime" && addplaycount){
			array.addplaycount = true;
			addplaycount = false;
		}
		$.post(url,
		array,
		function(data, status){
			callback(data, requestdata);
		});
	}
	function setStat(){
		StatArray.Duration = player.getDuration();
		PostData(RelativeRootPath+'setStats.php', StatArray, getStatID);
	}
	function getStatID(data, requestdata){
		StatID = JSON.parse(data).StatID;
		// console.log(requestdata);
		UpdateStat = 1;
	}
	function VideoStatUpdate_setInterval(){
		StatUpdate_interval = setInterval(function () {
			if(UpdateStat && playerPrevCurrentTime != player.getCurrentTime()){
				playerPrevCurrentTime = player.getCurrentTime();
				var setStatArray = 
				{
					'Ctime'		:	player.getCurrentTime().toFixed(1),
					'StatID'	:	StatID,
					'type'		:	'regularTime',
				}
				PostData(RelativeRootPath+'updateStats.php', setStatArray, getStatID, 'regular');
			}
		}, 3000);
	}
	function VideoStatUpdate_Play(){
		var sendstatus = true;
		var Ctime = player.getCurrentTime().toFixed(1);
		var playStat = setInterval(function () {
			if(StatID>0 && sendstatus){
				sendstatus = false;
				clearTimeout(playStat);
				var setStatArray = 
				{
					'Ctime'		:	Ctime,
					'StatID'	:	StatID,
					'type'		:	'playTime',
				}
				PostData(RelativeRootPath+'updateStats.php', setStatArray, getStatID, 'play');
			}
		}, 2000);
	}
	function VideoStatUpdate_Pause(){
		var sendstatus = true;
		var Ctime = player.getCurrentTime().toFixed(1);
		var pauseStat = setInterval(function () {
			if(StatID>0 && sendstatus){
				sendstatus = false;
				clearTimeout(pauseStat);
				var setStatArray = 
				{
					'Ctime'		:	Ctime,
					'StatID'	:	StatID,
					'type'		:	'pauseTime',
				}
				PostData(RelativeRootPath+'updateStats.php', setStatArray, getStatID, 'pause');
			}
		}, 2000);	
			
	}
	function VideoStatUpdate_changeseek(newTime){
		if(StatID==0){
			return;
		}
		var setStatArray = 
		{
			'Ctime'		:	player.getCurrentTime().toFixed(1),
			'newTime'	:	newTime.toFixed(1),
			'StatID'	:	StatID,
			'type'		:	'changeseekTime',
		}
		PostData(RelativeRootPath+'updateStats.php', setStatArray, getStatID, 'seek');
	}
	
	function VideoAction_setInterval(){
		time_update_interval = setInterval(function () {
			if(!ActionActiveStatus){
				$.each(ActionList, function( index, value ) {
					if(value.actiontime < player.getCurrentTime()){
						// console.log( value.actionid + ": " + value.actiontime );
						ActionList.splice(index, 1);
						// console.dir(ActionList);
						getActionIframe(value.actionid);
						return false;
					}
				});
			}	
		}, 200);
	}
	function getActionIframe(actionid){
		pauseVideo();
		ActionActiveStatus = true;
		$.post(RelativeRootPath+'getActionIframe.php',
		{
			'actionid':actionid
		},
		function(data, status){
			var ActionArray = JSON.parse(data);
			// console.log(ActionArray.skip);
			
			if(ActionArray.skip){
				AdPreSkip();
			}
			if(ActionArray.ActionType=='Annotation'){
				endActionIframe();
				$(".annotation-bar").show();
				$("#annotation-html").html(ActionArray.html);
				$("#annotation-link").attr("href", ActionArray.link);
			}
			else{
				ID('gateframe').src = ActionArray.url;
				$('.gate-bar').show();
			}
		});
	}
	function AdPreSkip(){
		var skiptime = 5;
		$(".AdPreSkipText").show();
		var AdPreSkip =setInterval(function () {
							$('.AdPreSkipText').html("You can skip in "+skiptime);
							if(skiptime < 0){
								$('.AdPreSkipText').html("<div onclick='endActionIframe();'>Skip Ad.</div>");
								clearInterval(AdPreSkip);
							}
							skiptime--;
						}, 1000);
	}
	function endActionIframe(){
		$(".AdPreSkipText").hide();
		$('.AdPreSkipText').html('');
		
		ActionActiveStatus = false;
		$('.gate-bar').hide();
		ID('gateframe').src = '';
		playVideo();
	}
	
	
	var subcount = 0; //used to reset subtile line no.
	var subtitles = new Array(); //subtitle list
	var subtitleEnable = false;
	function SubtitleInitialize(){
		$.ajax({
			method: 'get', 
			url: RelativeRootPath+'getSubTitle.php?VideoName='+VideoName ,
			type: 'html',
			success: function(data, status){ SubTitleStart(data); }
		});
	}
	function SubTitleStart(req){
		
		if(req==''){
			return;
		}
		subtitleEnable = true;
		req = req.replace(/[\r]/g, "");
		records = req.split('\n\n');
		for (var r=0;r<records.length;r++) {
			record = records[r];
			subtitles[r] = new Array();
			subtitles[r] = record.split('\n');
		}	
	}
	function updateSubTitleBar(){
		var subtitle = '';
		if(!subtitleEnable){ //if subtitle is desable, not proceed 
			return;
		}
		var temp_subtitle = subtitles[subcount][1];
		if(temp_subtitle.indexOf('-->') == -1){
			return;
		}

		// check if the next subtitle is in the current time range
		if (player.getCurrentTime().toFixed(1) > videosub_timecode_min(subtitles[subcount][1])  &&  player.getCurrentTime().toFixed(1) < videosub_timecode_max(subtitles[subcount][1])) {
			subtitle = subtitles[subcount][2];
		}
		// is there a next timecode?
		if (player.getCurrentTime().toFixed(1) > videosub_timecode_max(subtitles[subcount][1])  && subcount < (subtitles.length-1)) {
			subcount++;
		}
		$(".subtitle-bar-text").html(subtitle);
	}
	function videosub_timecode_min(tc){
		tcpair = tc.split(' --> ');
		return videosub_tcsecs(tcpair[0]);
	}
	function videosub_timecode_max(tc){
		tcpair = tc.split(' --> ');
		return videosub_tcsecs(tcpair[1]);
	}
	function videosub_tcsecs(tc){
		tc1 = tc.split(',');
		tc2 = tc1[0].split(':');
		secs = Math.floor(tc2[0]*60*60) + Math.floor(tc2[1]*60) + Math.floor(tc2[2]);
		return secs;
	}

	
	