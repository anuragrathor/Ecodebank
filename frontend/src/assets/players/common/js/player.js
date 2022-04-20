	var rangeActive = false;
	
	function ID(id){
		return document.getElementById(id);
	}
	$(document).ready(function () {
		Playerinitialize();
		SubtitleInitialize();
	});
	


	


	function PlayerStateChange(e){
		if(e.data==0 || player.getDuration()-player.getCurrentTime() < 1){
			seekToVideo(0);
			if(onVideoEndEvent == "stopfirst"){
				pauseVideo();
			}
		}
	}
	
	
	




function setOpacity(opacity){
	// $(".bg4").css('opacity', opacity);
	// $(".bg9").css('opacity', opacity);
	// $(".PlayBar").css('opacity', opacity);
}
	
	
	
	
	
	
	
	
	
	
	