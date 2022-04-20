<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>DotComPal - Player4</title>
<link rel="shortcut icon" href="common/images/favicon.png" />
<link href='https://fonts.googleapis.com/css?family=Roboto:300,400,600,800' rel='stylesheet' type='text/css'>
<link rel="stylesheet" type="text/css" href="player4/css/icomoon.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="common/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="player4/css/player-theme.css">
<link rel="stylesheet" href="player4/css/bootstrap-slider.css">
<script type='text/javascript' src="common/js/bootstrap-slider.js"></script>
<script type='text/javascript' src="player4/js/script.js"></script>
<script type='text/javascript' src="common/js/bootstrap.min.js"></script>
<script type="text/javascript">
$( document ).ready(function() {
<!------------------------------ play pause toggle button start ---------------------------------------->	
	$(".play-pause-btn").click( function() {
	$(".play-pause-btn").toggleClass('min');
});
<!------------------------------ play pause toggle button end ---------------------------------------->

<!------------------------------ Range slider for volume and seek slide starts ---------------------------------------->
	$('#ex1').slider({
		formatter: function(value) {
		return 'Current value: ' + value;
	}
});

	$("#ex4").slider({
		reversed : true
});

<!------------------------------ Range slider for volume and seek slide end ---------------------------------------->

<!------------------------------ controls hide show on mouse event js start ---------------------------------------->

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

		if(opacity){
			$(".top-bar-layout").removeClass('top-control-hidden');
			$(".top-bar-layout").addClass('top-control-show');
			
			$(".bottom-bar-layout").removeClass('bottom-control-hidden');
			$(".bottom-bar-layout").addClass('bottom-control-show');
		}
		else{
			$('#volumediv').hide();
			$('.share-drop').hide();
			$('.setting-drop').hide();
			$(".top-bar-layout").removeClass('top-control-show');
			$(".top-bar-layout").addClass('top-control-hidden');
			
			$(".bottom-bar-layout").removeClass('bottom-control-show');
			$(".bottom-bar-layout").addClass('bottom-control-hidden');
			}
		
	}
	
<!------------------------------ controls hide show on mouse event js end ---------------------------------------->

});
</script>
<!------------------------------ poster background css start ---------------------------------------->
<style type="text/css">
.poster {
	background-image: url("player4/images/poster.jpg");

}
</style>
<!------------------------------ poster background css end ---------------------------------------->
</head>
<body id="control-container">
<!-- Click for Audio Start-->
<div class="click-for-audio">
	<div class="text-format">Click For Audio</div>
	<div class="audio-control-circle">
		<img src="player1/images/volume-control-icon.gif" class="img-responsive center-block mx-height">
	</div>	
</div>
<!-- Click for Audio End-->	
<div id="preloader" style="display:none;"></div>
<div class="poster"> 
  <!--  <video onpause="onpauseEvent();" onplay="onplayEvent();" poster="https://s3.amazonaws.com/videowhizz/UploadVideos/t3yew5z5be/t3yew5z5be.png" src="https://s3.amazonaws.com/videowhizz/UploadVideos/t3yew5z5be/t3yew5z5be_480.mp4" preload="metadata" id="SAG-Video"></video>--> 
</div>

<!------------------------------ top video controls starts---------------------------------------->
<div class="top-bar-layout">
  <div class="vidoe-title em16 smem12 xsem10 w300"> Video Title </div>
  <div class="video-controls-top text-right">
    <ul>
      <li> <a href="#"><span class="icon-fullscreen em12 smem10 xsem8" aria-hidden="true"></span></a> </li>
      <li> <a onclick="setOptions('options');"><span class=" icon-more em14 smem12 xsem10" aria-hidden="true"></span></a> </li>
		<li> <a data-toggle="modal" data-target="#share-modal"><span class="icon-share" aria-hidden="true"></span></a></li>
      <li> <a data-toggle="modal" data-target="#embed-modal"><span class="icon-embed em14 smem12 xsem10" aria-hidden="true"></span></a> </li>
      
    </ul>
    
    <!------------------------------ setting dropdown starts---------------------------------------->
    <div class="Settingtab Settingindex" tabindex="3">
      <div class="Setting optionsindex options" style="display:none" tabindex="3">
        <div class="OptionList" onclick="setOptions('speed');"> <span>
          <div class="col-md-4 col-sm-4 col-xs-2 mt3"><i class="icon-speed em16 smem12 xsem10"  aria-hidden="true"></i></div>
          <div class="col-md-8 col-sm-7 col-xs-8 em12 smem12 xsem10">Normal</div>
          </span> </div>
        <div class="OptionList"> <span>
          <div class="col-md-4 col-sm-4 col-xs-2 em12 smem12 xsem10"> CC</div>
          <div class="col-md-8 col-sm-8 col-xs-8">
            <label class="switch-btn" style="margin:0 !important;">
              <input class="switch-btn-input" type="checkbox"  />
              <span class="switch-btn-label" data-on="On" data-off="Off"></span> <span class="switch-btn-handle11"></span> </label>
          </div>
          </span> </div>
      </div>
      <div class="Setting Settingindex speed" style="display:none" tabindex="3">
        <div class="OptionList" onclick="setOptions('speed');"> <span class="em12 smem11 xsem9"> X Speed</span> </div>
        <div class="OptionList Speed slow" onclick="setVideoPlaybackRate(0.5)"> <span class="em12 smem11 xsem9">0.5 X</span> </div>
        <div class="OptionList Speed normal active" onclick="setVideoPlaybackRate(1)"> <span class="em14 smem11 xsem9">Normal</span> </div>
        <div class="OptionList Speed fast" onclick="setVideoPlaybackRate(1.5)"> <span class="em12 smem11 xsem9">1.5 X</span> </div>
      </div>
    </div>
    
    <!------------------------------ setting dropdown end----------------------------------------> 
    
  </div>
</div>
<!----------------------------- top video controls end----------------------------------------> 

<!---------------------------- center play button start---------------------------------------->
<div class="ceneter-play-btn"> <a href="#" class="em25 smem22 xsem20"><i class="icon-play"></i></a> </div>
<!---------------------------- center play button start----------------------------------------> 

<!---------------------------- title div start---------------------------------------->
<div class="title-div em13 smem12 xsem9 text-wrap text-center">Lorem ipsum doler Lorem ipsum dolerm</div>
<!---------------------------- title div end----------------------------------------> 

<!---------------------------- bottom video controls start---------------------------------------->

<div class="bottom-bar-layout">
  <div id="player-control">
    <div class="left-control clearfix">
      <button class="play-pause-btn" ng-click="toggle()" data-active-icon='&#xe000;' data-inactive-icon='&#xe001;'></button>
    </div>
    
    <div class="center-control clearfix">
      <div class="player-time hidden-mobile"> 00:09 / 01:59</div>
      <div class="seek_slide">
        <input id="ex1" data-slider-id='ex1Slider' type="text" data-slider-min="0" data-slider-max="100" data-slider-step="1" data-slider-value="5" data-slider-tooltip="hide" />
		<!-- advertiesment icon div start--->
        <div class="advertiesment-icon">
        <div class="round-circle"></div>
        </div>
        <!-- advertiesment icon div end--->  
      </div>
    </div>
    
    <div class="right-control clearfix">
      <ul id="video-control-right">
        <li id="volume-btn" class="control-hidden mt2"> <a href="#"><i class="icon-volume mdem12 em12 smem11 xsem9" aria-hidden="true"></i></a>
          <div>
            <input id="ex4" data-slider-id='ex2Slider' type="text" data-slider-min="-5" data-slider-max="20" data-slider-step="1" data-slider-value="-3" data-slider-orientation="vertical"  data-slider-tooltip="hide" />
          </div>
        </li>
        <li><a href="#" class="em18 smem14 xsem9 w600">HD</a></li>
        <li><a href="#"><img src="player4/images/Saglus.png" class="saglus-logo" /></a></li>
      </ul>
    </div>
  </div>
</div>

<!---------------------------- bottom video controls end----------------------------------------> 
	
<!-- Subtitle Start --->
<div class="subtitle-top">
<span class="text-format">and the way we access it is changing and the way we access it is changing and the way we access it is changing and the way we access it is changing </span>
</div>
<!-- Subtitle End --->	

<!---------------------------- embed popup start ---------------------------------------->
<div id="embed-modal" class="modal fade" role="dialog">
  <button type="button" class="close-btn em12 smem12 xsem10" data-dismiss="modal">&times;</button>
  <div class="modal-dialog modal-md">
    <p class="text-center em13 smem12 xsem10 white-color w300">Embed this video in your site using the code below</p>
    <div class="embed-code em11 smem10 xsem10 w300">
      <textarea name="" class="grey-color">https://support.ustream.tv/hc/en-us/articles/207851917-How-to-embed-a-stream-or-video-on-your-site</textarea>
    </div>
    <div class="text-center">
      <button type="button" class="embed-btn" >Copy Embed Code</button>
    </div>
  </div>
</div>
<!---------------------------- Embed Popup end ----------------------------------------> 

<!---------------------------- share popup start---------------------------------------->
<div id="share-modal" class="modal fade" role="dialog">
  <button type="button" class="close-btn em12 smem12 xsem10" data-dismiss="modal">&times;</button>
  <div class="modal-dialog modal-md">
    <div class="text-center">
      <ul class="social-network social-circle">
        <li><a href="#" class="icoFacebook" title="Facebook"><i class="icon-facebook em26 smem18 xsem12"></i></a></li>
        <li><a href="#" class="icoTwitter" title="Twitter"><i class="icon-twitter em26 smem18 xsem12"></i></a></li>
        <li><a href="#" class="icoLinkedin" title="Linkedin"><i class="icon-linkedin em26 smem18 xsem12"></i></a></li>
      </ul>
    </div>
  </div>
</div>
<!---------------------------- share Popup end ---------------------------------------->

</body>
</html>
