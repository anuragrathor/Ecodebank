$(document).ready(function () {
	SubtitleInitialize();
});
var subcount = 0; //used to reset subtile line no.
var subtitles = new Array(); //subtitle list
var subtitleEnable = false;
function SubtitleInitialize(){
	$.ajax({
		method: 'get', 
		url: subtitle_url ,
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
	if (currentTime().toFixed(1) > videosub_timecode_min(subtitles[subcount][1])  &&  currentTime().toFixed(1) < videosub_timecode_max(subtitles[subcount][1])) {
		subtitle = subtitles[subcount][2];
	}
	// is there a next timecode?
	if (currentTime().toFixed(1) > videosub_timecode_max(subtitles[subcount][1])  && subcount < (subtitles.length-1)) {
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

	
var screen_change_events = "webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange";
var fullscreen_status = 0;
$(document).on(screen_change_events, function () {
	fullscreen_status= 1-fullscreen_status;
	var fullscreen = document.getElementsByClassName('fullscreen');
	if(fullscreen_status){	
		$('.fullscreen-bottom')[0].src = RelativeRootPath+ImageFolder+"/FullScreenExit.png";
	}
	else{
		$('.fullscreen-bottom')[0].src = RelativeRootPath+ImageFolder+"/FullScreen.png";
	}
});

function fullscreen() {
	screenfull.toggle($('body')[0]);
}