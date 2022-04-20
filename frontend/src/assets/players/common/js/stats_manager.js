var UpdatePlayCount = 1;
var playerPrevCurrentTime = 0;
var UpdateStat = 0;
var StatID = 0;
$(document).ready(function () {
	setStat();
	VideoStatUpdate_setInterval();
});
function PostData(url, array, callback, requestdata){
	$.post(url,
	array,
	function(data, status){
		callback(data, requestdata);
	});
}
function setStat(){
	var setstat_interval = setInterval(function () {
		if(durationTime() > 0){
			clearInterval(setstat_interval);
			PostData(ctr_base_url+'setstats?video_slug='+video_slug, {}, getStatID);
		}
	}, 200);
	
}
function getStatID(data, requestdata){
	StatID = JSON.parse(data).stat_id;
	UpdateStat = 1;
}
function VideoStatUpdate_setInterval(){
	StatUpdate_interval = setInterval(function () {		
		if(StatID && playerPrevCurrentTime != currentTime()){
			playerPrevCurrentTime = currentTime();
			var setStatArray = 
			{
				'Ctime'		:	currentTime().toFixed(1),
				'StatID'	:	StatID,
				'type'		:	'regularTime',
			}
			PostData(ctr_base_url+'updatestats', setStatArray, getStatID, 'regular');
		}
		
		if(UpdatePlayCount && currentTime() > 0){
			UpdatePlayCount = 0;
			$.post(ctr_base_url+'addplaycount',
			{
				"video_id": video_id
			},
			function(data, status){
				console.log("addplaycount");
			});
		}
		
	}, 1000);
}
function VideoStatUpdate_Play(){
	if(StatID==0){return;}
	var sendstatus = true;
	var Ctime = currentTime().toFixed(1);
	var playStat = setInterval(function () {
		if(sendstatus){
			sendstatus = false;
			clearTimeout(playStat);
			var setStatArray = 
			{
				'Ctime'		:	Ctime,
				'StatID'	:	StatID,
				'type'		:	'playTime',
			}
			PostData(ctr_base_url+'updatestats', setStatArray, getStatID, 'play');
		}
	}, 200);
}
function VideoStatUpdate_Pause(){
	if(StatID==0){return;}
	var sendstatus = true;
	var Ctime = currentTime().toFixed(1);
	var pauseStat = setInterval(function () {
		if(sendstatus){
			sendstatus = false;
			clearTimeout(pauseStat);
			var setStatArray = 
			{
				'Ctime'		:	Ctime,
				'StatID'	:	StatID,
				'type'		:	'pauseTime',
			}
			PostData(ctr_base_url+'updatestats', setStatArray, getStatID, 'pause');
		}
	}, 200);	
		
}
function VideoStatUpdate_changeseek(newTime){
	if(StatID==0){return;}
	var setStatArray = 
	{
		'Ctime'		:	currentTime().toFixed(1),
		'newTime'	:	newTime.toFixed(1),
		'StatID'	:	StatID,
		'type'		:	'changeseekTime',
	}
	PostData(ctr_base_url+'updatestats', setStatArray, getStatID, 'seek');
}

function onplayEvent(){
	FrontDispaly('play');
	VideoStatUpdate_Play();
}
function onpauseEvent(){
	FrontDispaly('pause');
	VideoStatUpdate_Pause();
}
