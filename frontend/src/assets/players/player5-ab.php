<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>DotComPal - Player5</title>
<link rel="shortcut icon" href="common/images/favicon.png" />
<link href='https://fonts.googleapis.com/css?family=Roboto:300,400,600,800' rel='stylesheet' type='text/css'>
<link rel="stylesheet" type="text/css" href="player5/css/icomoon.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="common/css/bootstrap.min.css">
<link rel="stylesheet" href="player5/css/bootstrap-slider.css">
<script type='text/javascript' src="common/js/bootstrap-slider.js"></script>
<script type='text/javascript' src="common/js/bootstrap.min.js"></script>
<link rel="stylesheet" type="text/css" href="player5/css/player-theme.css">
<!------------ poster background css start -------------->
<style type="text/css">
.poster {
	/*background-image:url(common/images/black.jpg);*/
	background-image: url(player5/images/poster.jpg);
}
</style>

<!-------------- poster background css end ------------------->
<script type="text/javascript">
$( document ).ready(function() {
	
<!------------ Setting option js start ------------------>
$(".quality").click(function(){
	$(".speed-option").hide();
	$(".quality-option").toggle();
	icon = $(this).find("i");
	icon.toggleClass("icon-down icon-up")
});
	
$(".speed").click(function(){
	$(".quality-option").hide();
	$(".speed-option").toggle();
	icon = $(this).find("i");
	icon.toggleClass("icon-down icon-up")
});
<!------------ Setting option js start end ------------------>	
	
<!------------ play pause toggle button start ------------------>	
$(".play-pause-btn").click( function() {
	$(".play-pause-btn").toggleClass('min');
});
<!--------------- play pause toggle button end ------------------->

<!------- volume seekbar div start----->
$('#volumebtn').click(function(e){
    e.stopPropagation();
    $('.share-drop').hide();
	$('.setting-drop').hide();
    $('#volumediv').toggle();
});
<!------- volume seekbar div end----->

<!------- Share Dropdown div start----->
$('#sharebtn').click(function(e){
    e.stopPropagation();
    $('#volumediv').hide();
	$('.setting-drop').hide();
	$('.share-drop').toggle();
});
<!----- Share Dropdown div End--->

<!----- Setting Dropdown div start--->
$('#settingbtn').click(function(e){
    e.stopPropagation();
    $('#volumediv').hide();
	$('.share-drop').hide();
    $('.setting-drop').toggle();
});

$('.setting-drop').click(function(e){
    e.stopPropagation();
});
<!------- setting dropdown end----->

<!--- all dropdown hide -->
$(document).click(function(){
   $('.managesection').hide();
});

<!------- Range Highlights js ----->
$('#progress-bar').slider({
    id: 'ex1Slider',
    rangeHighlights: [{ "start": 0, "end":100,}]
});

<!-------------- controls hide show on mouse event js start ------------------>

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
			$('#volumediv').hide();
			$('.share-drop').hide();
			$('.setting-drop').hide();
			$(".top-bar-layout").removeClass('top-control-show');
			$(".top-bar-layout").addClass('top-control-hidden');
			
			$(".bottom-bar-layout").removeClass('bottom-control-show');
			$(".bottom-bar-layout").addClass('bottom-control-hidden');
			}
		
	}

	
<!------------ controls hide show on mouse event js end ------------>
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

    <div class="col-xs-10 padding0">
      <div class="md16 sm16 xs13 w400 vidoe-title">
      <span class="title-bar text-color"> Video Name</span>
      </div>
    </div>    
 
</div>
<!----------------------------- top video controls end----------------------------------------> 

<!---------------------------- center play button start---------------------------------------->
<div class="ceneter-play-btn  bg4 playpause" onclick="playVideo()">
	<!--<a href="javascript:" class="md40 sm30 xs18 text-color">
    <i class="icon-play"></i>    
    </a>-->
    <img src="common/images/loader.gif" class="playloader" />
</div>
<!---------------------------- center play button start----------------------------------------> 

<!---------------------------- bottom video controls start----------------------------------------> 
<div class="bottom-bar-layout">
  <!-- Ab Loop Slider -->
<div class="abloop-slider">
	<div class="center-control clearfix">
    
      <div class="player-time-left md15 sm15 xs14 w400 timer">
      <span id="current-time">0:00</span> </div>
      <div class="seek_slide PlayBar">
      <input id="progress-bar-ab" data-slider-id='ex5Slider' type="text" class="span" data-slider-min="10" data-slider-max="100" data-slider-value="[10,90]"/>
      </div>
      
      <div class="player-time-right md15 sm15 xs14 w400 timer">
      <span id="duration-time">0:00</span></div>
      
    </div>
</div>
<!-- Ab Loop Slider End -->	

<div id="slider-player-control" class="">
<div class="top-control clearfix">
<div class="seek_slide PlayBar">
<input id="progress-bar" data-slider-id='ex1Slider' type="text" data-slider-min="0"        data-slider-max="100" data-slider-value="25" data-slider-tooltip="hide"   data-slider-rangeHighlights='[{ "start": 0, "end": 100}]'  />

<!-- advertiesment icon div start -->
<div class="advertiesment-icon">
<div class="round-circle"></div>
</div>
<!-- advertiesment icon div end--->
</div>
</div>
</div>   
      
<div id="player-control" class="bg4 text-color">
    
    
    <div class="left-control clearfix">
    <div class="player-time md15 sm15 xs14 w400 timer mr-auto">
      <span id="current-time">0:00</span> 
      <span class="time-devider">/</span>
      <span id="duration-time">0:00</span>
      </div>
    </div>
    
    <div class="center-control clearfix">      
      <div class="seek_slide PlayBar">
      <div class="middle-btn-control clearfix">
        <button class="play-pause-btn PlayPause-bottom" onclick="playVideo()" ng-click="toggle()" data-active-icon='&#x26;' data-inactive-icon='&#x27;'></button>        
	  </div>
      </div>
      
    </div>
    
    <div class="right-control clearfix">
      <ul id="video-control-right">
        <li class="mt2 Volume"> <a href="javascript:" class="text-color" id="volumebtn"><i class="icon-volume md17 sm15 xs14" aria-hidden="true"></i></a>          
        </li>
        <li style="margin-right:0;">
        <div id="volumediv" class="managesection">
            <input id="Volume-bar"  data-slider-id='ex2Slider' type="text" data-slider-min="0" data-slider-max="100" data-slider-step="1" data-slider-value="35"  data-slider-tooltip="hide"  />
          </div>
        </li>
        <li class="dropdown"> <a href="javascript:" class="text-color dropdown-toggle" id="sharebtn" data-toggle="dropdown"><i class="icon-share md17 sm15 xs14" aria-hidden="true"></i></a>
          <ul class="dropdown-menu share-drop managesection">
            <li><a href="#" class="md14 sm14 xs14"> <i class="icon icon-facebook"></i>Facebook</a></li>
            <li><a href="#" class="md14 sm14 xs14"> <i class="icon icon-twitter"></i>Twitter</a></li>
            <li><a href="#" class="md14 sm14 xs14"> <i class="icon icon-linkedin"></i>Linkedin</a></li>
            
            <li><a href="#" data-toggle="modal" data-target="#email-modal" class="md14 sm14 xs14"> <i class="icon icon-mail"></i>Email</a></li>
            <li><a href="#" data-toggle="modal" data-target="#embed-modal" class="md14 sm14 xs14"> <i class="icon icon-embed"></i>Embed</a></li>
            <li class="borderhide"><a href="#" class="md14 sm14 xs14"> <i class="icon icon-download"></i>Download</a></li>
          </ul>
        </li>
        <li class="dropdown setting-dropdown"> <a href="javascript:" class="text-color dropdown-toggle" id="settingbtn"><i class="icon-setting md17 sm15 xs14" aria-hidden="true"></i></a>
          <ul class="dropdown-menu setting-drop managesection">
            <li><a href="#" class="md14 sm14 xs14 quality">
              <div class="row">
                <div class="col-xs-5">Quality </div>
                <div class="md12 sm12 xs12 grey-color w300 col-xs-5 mt4">1080px</div>
                <div class="md12 sm12 xs12 grey-color w300 col-xs-2 mt6"> <i class="icon-down white-color"></i></div>
              </div>
              </a>
              <div class="quality-option clearfix">
                <div class="row">
                  <div class="col-xs-6">
                    <input id="Auto" name="Quality" checked="checked" value="1" type="radio">
                    <label for="Auto" class="md13 sm13 xs13 w300"><span class="mrgn">Auto</span> </label>
                  </div>
                  <div class="col-xs-6">
                    <input id="144" name="Quality" value="1" type="radio">
                    <label for="144" class="md13 sm13 xs13 w300"><span class="mrgn">144 px </span></label>
                  </div>
                  <div class="col-xs-6">
                    <input id="244" name="Quality" value="1" type="radio">
                    <label for="244" class="md13 sm13 xs13 w300"><span class="mrgn">244 px</span> </label>
                  </div>
                  <div class="col-xs-6">
                    <input id="360" name="Quality" value="1" type="radio">
                    <label for="360" class="md13 sm13 xs13 w300"><span class="mrgn">360 px </span></label>
                  </div>
                  <div class="col-xs-6">
                    <input id="480" name="Quality" value="1" type="radio">
                    <label for="480" class="md13 sm13 xs13 w300"><span class="mrgn">480 px</span> </label>
                  </div>
                  <div class="col-xs-6">
                    <input id="720" name="Quality" value="1" type="radio">
                    <label for="720" class="md13 sm13 xs13 w300"><span class="mrgn">720 px </span></label>
                  </div>
                  <div class="col-xs-6">
                    <input id="1080" name="Quality" value="1" type="radio">
                    <label for="1080" class="md13 sm13 xs13 w300 mb0"><span class="mrgn">1080 px</span> </label>
                  </div>
                </div>
              </div>
            </li>
            <li><a href="#" class="md14 sm14 xs14 speed">
              <div class="row">
                <div class="col-xs-5">Speed </div>
                <div class="md12 sm12 xs12 grey-color w300 col-xs-5 mt4">Normal</div>
                <div class="md12 sm12 xs12 grey-color w300 col-xs-2 mt6"> <i class="icon-down white-color"></i></div>
              </div>
              </a>
              <div class="speed-option">
                <div class="row">
                  <div class="col-xs-6">
                    <input id="2" name="Speed" checked="checked" value="1" type="radio">
                    <label for="2" class="md13 sm13 xs13 w300"><span class="mrgn">2</span> </label>
                  </div>
                  <div class="col-xs-6">
                    <input id="1.5" name="Speed" value="1" type="radio">
                    <label for="1.5" class="md13 sm13 xs13 w300"><span class="mrgn">1.5 </span></label>
                  </div>
                  <div class="col-xs-6">
                    <input id="1.25" name="Speed" value="1" type="radio">
                    <label for="1.25" class="md13 sm13 xs13 w300"><span class="mrgn">1.25</span> </label>
                  </div>
                  <div class="col-xs-6">
                    <input id="Normal" name="Speed" value="1" type="radio">
                    <label for="Normal" class="md13 sm13 xs13 w300"><span class="mrgn">Normal </span></label>
                  </div>
                  <div class="col-xs-6">
                    <input id="0.75" name="Speed" value="1" type="radio">
                    <label for="0.75" class="md13 sm13 xs13 w300"><span class="mrgn">0.75</span> </label>
                  </div>
                  <div class="col-xs-6">
                    <input id="0.5" name="Speed" value="1" type="radio">
                    <label for="0.5" class="md13 sm13 xs13 w300"><span class="mrgn">0.5 </span></label>
                  </div>
                  <div class="col-xs-6">
                    <input id="0.25" name="Speed" value="1" type="radio">
                    <label for="0.25" class="md13 sm13 xs13 w300 mb0"><span class="mrgn">0.25</span> </label>
                  </div>
                </div>
              </div>
            </li>
            <li class="md14 sm14 xs14">Subtitle
              <div class="pull-right">
                <label class="switch">
                <input checked="checked" type="checkbox">
                <div class="switch-slider round"></div>
                </label>
              </div>
            </li>
            <li class="md14 sm14 xs14">Annotation
              <div class="pull-right">
                <label class="switch">
                <input type="checkbox">
                <div class="switch-slider round"></div>
                </label>
              </div>
            </li>
            <li class="borderhide md14 sm14 xs14">Autoplay
              <div class="pull-right">
                <label class="switch">
                <input checked="checked" type="checkbox">
                <div class="switch-slider round"></div>
                </label>
              </div>
            </li>
          </ul>
        </li>
        <li>
        <a href="javascript:" class="md17 sm15 xs14 fullscreen-btn">
        <i class="icon-full-screen-second"></i></a>
        </li>
		 <li class="abloop-iconmargin"><a href="javascript:"><i class="icon-ab-loop md24 sm21 xs18" aria-hidden="true"></i></a></li> 
        <li>
        <a href="javascript:" class="saglus-logo">
        <img src="common/images/Saglus.png" style="max-height:22px;" /></a>
        </li>        
      </ul>
    </div>
    
  </div>
  
</div>

<!---------------------------- bottom video controls end----------------------------------------> 

<!---------------------------- advertise-bar start---------------------------------------->

<div class="annotation-bar" style="display:none;" align="center">
<div class="annotation-content">
	<button type="button" class="close-btn-anotation em12 smem12 xsem10" data-dismiss="modal">×</button>
	<a id="annotation-link" class="white-color" target="_blank">
    <div id="annotation-html" >
   <!--- text start -->
   <div class="content-bg">
    <h3 class="w500 md16 sm16 xs16">Annotation Heading</h3>
    <p class="md14 sm14 xs14 w300">Lorem Ipsum Lorem Ipsum Lorem Ipsum  </p>
    </div>
   <!--- text end -->
   
   <!-- image start--->
 <!--  <img class="annotation-img img-responsive" src="http://media.istockphoto.com/photos/forest-with-sun-picture-id493890164" />-->
    <!-- image start--->
	
    </div></a>
</div></div>

<!---- Ggate Bar Start---->
<div class="gate-bar" style="display:none;">
	<button type="button" class="skip-gate gate-close-btn em12 smem12 xsem10" data-dismiss="modal">×</button>
	<iframe src="advertise-player.php" frameborder="0" id="gateframe" style="width: 100%;height: 100%;"></iframe>
</div>
<!---- Gate Bar End---->
	
<!-- Subtitle Start --->
<div class="subtitle-top">
<span class="text-format">and the way we access it is changing and the way we access it is changing and the way we access it is changing and the way we access it is changing </span>
</div>
<!-- Subtitle End --->		

<!---- Personalization Div Start---->
<!-- top Personalization div-->
<!--<div style="color: #fff;background: #ff0505;" class="top-left ad-box" id="ad_id">
Top Left</div>
<div style="color: #fff;background: #999900;" class="top-center ad-box" id="ad_id">
Top Center</div>
<div style="color: #fff;background: #ff0505;" class="top-right ad-box" id="ad_id">
Top Right</div>-->

<!-- Center Personalization div-->
<!--<div class="center-left ad-box" id="ad_id">
<div class="center-dialog" style="color: #fff;background: #ff0505;">
Center Center</div>
</div>

<div class="center-center ad-box" id="ad_id">
<div class="center-dialog" style="color: #fff;background: #999900;">
Center Center</div>
</div>

<div class="center-right ad-box" id="ad_id">
<div class="center-dialog" style="color: #fff;background: #ff0505;">
Center Center</div>
</div>-->

<!-- Bottom Personalization div-->
<!--<div style="color: #fff;background: #ff0505;" class="bottom-left ad-box" id="ad_id">
Bottom Left</div>
<div style="color: #fff;background: #999900;" class="bottom-center ad-box" id="ad_id">
Bottom Center</div>
<div style="color: #fff;background: #ff0505;" class="bottom-right ad-box" id="ad_id">
Bottom Right</div>-->

<!---- Personalization Div End---->

<!---------------------------- advertise-bar end---------------------------------------->



<!---------------------------- embed popup start ---------------------------------------->
<div id="embed-modal" class="modal fade" role="dialog">
  <!--<button type="button" class="close-btn md16 sm16 xs14 w700" data-dismiss="modal"><i class="icon icon-cross"></i></button>-->
  <div class="modal-dialog modal-size">
  <p class="text-center md20 sm18 xs16 white-color w500">Copy the code to embed it</p>
  <div class="embed-code mb15">
  <textarea name="" class="md16 sm16 xs14 w300"><div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/Qlt-VuchLQo?ecver=2" width="640" height="360" frameborder="0" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div><div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/Qlt-VuchLQo?ecver=2" width="640" height="360" frameborder="0" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>
      </textarea>
</div>
<div class="text-center mt15">
  <button type="button" class="embed-btn cancel md20 sm18 xs16 w400" data-dismiss="modal">Cancel</button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button type="button" class="embed-btn md20 sm18 xs16 w400">Copy</button>
</div>
</div>
</div>
<!---------------------------- Embed Popup end ----------------------------------------> 

<!---------------------------- Email Popup start ---------------------------------------->
<div id="email-modal" class="modal fade" role="dialog">
  <!--<button type="button" class="close-btn md16 sm16 xs14 w700" data-dismiss="modal"><i class="icon icon-cross"></i></button>-->
  <div class="modal-dialog email-modal-size email-form">
    <p class="text-center md20 sm18 xs16 white-color w500">Email this video</p>
    <div class="form-group">
      <input type="Email" class="form-control" placeholder="Type your email id here" id="pwd">
    </div>
    <div class="form-group">
      <input type="text" class="form-control" id="pwd" value="https://youtu.be/Qlt-VuchLQo">
    </div>
    <div class="form-group">
      <textarea name="Message" class="form-control" cols="" rows="5" placeholder="Type your message here"></textarea>
    </div>
    <div class="text-center">
      <button type="button" class="embed-btn cancel md20 sm18 xs16 w400" data-dismiss="modal">Cancel</button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button type="button" class="embed-btn md20 sm18 xs16 w400">Send</button>
    </div>
  </div>
</div>
<!---------------------------- Email Popup end ----------------------------------------> 

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
<script src="player5/js/script.js"></script> 
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
