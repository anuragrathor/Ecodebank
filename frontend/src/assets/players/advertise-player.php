<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Videowhizz - Advertisement Player</title>
<link rel="shortcut icon" href="common/images/favicon.png" />
<link href='https://fonts.googleapis.com/css?family=Roboto:300,400,600,800' rel='stylesheet' type='text/css'>
<link rel="stylesheet" type="text/css" href="advertise-player/css/icomoon.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="common/css/bootstrap.min.css">
<link rel="stylesheet" href="advertise-player/css/bootstrap-slider.css">
<script type='text/javascript' src="common/js/bootstrap-slider.js"></script>
<script type='text/javascript' src="common/js/bootstrap.min.js"></script>
<link rel="stylesheet" type="text/css" href="advertise-player/css/player-theme.css">
<!------------ poster background css start -------------->
<style type="text/css">
.poster {
	/*background-image:url(common/images/black.jpg);*/
	background-image: url(advertise-player/images/poster.jpg);
}
</style>
<!-------------- poster background css end ------------------->

<script type="text/javascript">
$( document ).ready(function() {
<!------------ play pause toggle button start ------------------>	
	$(".play-pause-btn").click( function() {
	$(".play-pause-btn").toggleClass('min');
});

<!--------------- play pause toggle button end ------------------->

});
</script>
</head>
<body id="control-container">
<div id="preloader" class="loadwaiting" style="display:none;"></div>
<div class="poster" onclick="pauseVideo()"> 
  <!--<video onpause="onpauseEvent();" onplay="onplayEvent();" poster="<?php echo $poster; ?>" src="<?php echo $video; ?>" preload="metadata" id="SAG-Video"></video>--> 
</div>

<!------------------------------ top video controls starts---------------------------------------->
<div class="top-bar-layout">

    <div class="col-md-9 col-sm-7 col-xs-12 padding0">
        <div class="md23 sm21 xs16 w300 video-title text-shadow">
        <span class="title-bar text-color"> Advertisement Name</span> </div>
    </div>
    <div class="col-md-3 col-sm-5 col-xs-12 text-right padding0">
      
      <div class="pull-right addverties-bg">
        <div class="pull-left content">
        	<!--<span class="md13 sm13 xs13 w500">You can skip to video in 3</span>-->
            <a href="#" class="md16 sm16 xs16 w500">Skip Ad &nbsp;<i class="icon icon-skip md12 sm12 xs12"></i></a>
        </div>
        <div class="pull-right">
        	<img src="advertise-player/images/video-thumbnail.jpg" class="img-responsive"  />
        </div>
                 
     </div>
            
  </div>
    

</div>
<!----------------------------- top video controls end----------------------------------------> 

<!---------------------------- center play button start---------------------------------------->
<div class="ceneter-play-btn  bg4 playpause" onclick="playVideo()"> <a href="javascript:" class="md35 sm30 xs30 text-color"><i class="icon-play"></i></a> </div>
<!---------------------------- center play button start----------------------------------------> 

<!---------------------------- bottom video controls start----------------------------------------> 
<!-- Seekbar Slide-->
<div class="seekbar-full clearfix">
  <div class="seek_slide PlayBar">
    <input id="progress-bar" data-slider-id='ex1Slider' type="text" data-slider-min="0" data-slider-max="100"  data-slider-value="0" data-slider-tooltip="hide"  />
  </div>
</div>
<!-- Seekbar Slide-->

<div class="bottom-bar-layout">
  <div id="player-control" class="bg4 text-color">
    <div class="left-control clearfix">
      <button class="play-pause-btn PlayPause-bottom" onclick="playVideo()" ng-click="toggle()" data-active-icon='&#x23;' data-inactive-icon='&#x24;'></button>
      <div class="player-time-left md14 sm14 xs13 w500 timer"> <span id="current-time">00:47</span> </div>
      <div class="player-time-left md14 sm14 xs13 w500 timer"> <span class="hidden-xs">Visit Advertiser’s Site </span>
      <a href="#" class="preview-icon mt2 md15 sm15 xs15" title="Visit Advertiser’s Site  "><i class="icon icon-view"></i></a></div>
    </div>
    <div class="right-control clearfix">
      <ul id="video-control-right">
       <li class="mt2 Volume">
       <a href="javascript:" class="text-color">
        <i class="icon-Volume md17 sm15 xs14" aria-hidden="true"></i>
        </a> 
        <a href="#" class="firstLine active"></a>
        <a href="#" class="secondLine active"></a>
        <a href="#" class="thirdLine"></a>
        <a href="#" class="fourthLine"></a>
        <a href="#" class="fiveLine"></a>
        <a href="#" class="sixLine"></a>
        
        </li>
        <li class="mt2 Volume"> <a href="javascript:" class="text-color">
        <i class="icon-full-screen md17 sm15 xs14" aria-hidden="true"></i></a> </li>
      </ul>
    </div>
  </div>
</div>

<!---------------------------- bottom video controls end----------------------------------------> 

<script>
var video_slug 		= '<?php echo $video_info['slug']; ?>';
var video_id 		= '<?php echo $video_info['id']; ?>';
var ctr_base_url 	= '<?php echo $ctr_base_url; ?>';
var subtitle_url 	= '<?php echo $subtitle_url; ?>';

var video_urls = <?php echo $video_info['urls']; ?>;
var playerTheme = <?php echo json_encode($video_theme); ?>;
var actionList = <?php echo json_encode($video_ads); ?>;
var actionStatus = false; // initianly action is not active.
</script> 
<script src="common/js/player_url.js"></script> 
<script src="common/js/screenfull.js"></script> 
<script src="common/js/subtitle.js"></script> 
<script src="common/js/ads_manager.js"></script> 
<script src="common/js/stats_manager.js"></script> 
<script src="common/js/layout_manager.js"></script> 
<script src="common/js/convert.help.js"></script> 
<script src="advertise-player/js/script.js"></script> 
<script src="common/js/processStatus.js"></script> 
<script>
var min_resolution = Object.keys(video_urls)[0];
var max_resolution = Object.keys(video_urls)[Object.keys(video_urls).length - 1];
$('.videoquatily').attr('onclick', 'setVideoQuatily(\''+max_resolution+'\')');
function setVideoQuatily(quality){
	if(quality == '240P'){
		$(".videoquatily").removeClass("active-hd");
		$('.videoquatily').attr('onclick', 'setVideoQuatily(\''+max_resolution+'\')');
	}
	else{
		$(".videoquatily").addClass("active-hd");
		$('.videoquatily').attr('onclick', 'setVideoQuatily(\''+min_resolution+'\')');
	}
	setPlaybackQuality(quality);
}
function setPlaybackQuality(quality){
	var playpaused = ID("SAG-Video").paused;
	ID("SAG-Video").src = video_urls[quality]+"#t="+ID("SAG-Video").currentTime; //value is source path.
	ID("SAG-Video").load();
	if(!playpaused){
		playVideo();
	}
}	
</script>
</body>
</html>
