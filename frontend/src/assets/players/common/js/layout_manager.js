function ID(id){
	return document.getElementById(id);
}
function CLASS(id){
	return document.getElementsByClassName(id);
}
function TAGS(id){
	return document.getElementsByTagName(id);
}
function GetColorRGB(value){
	value = value.replace('#', '');
    var result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
    return parseInt(result[1], 16)+','+parseInt(result[2], 16)+','+ parseInt(result[3], 16);
}
function rgbToHex(rgb) {
	rgb = rgb.split(",");
    return ((1 << 24) + (parseInt(rgb[0]) << 16) + (parseInt(rgb[1]) << 8) + parseInt(rgb[2])).toString(16).slice(1);
}
function setCurrentPlayerPreviews(){
	var bottomdisplay = false;		
	if(true){
		var rgba9 = "rgba("+GetColorRGB(playerTheme.color_bg)+",0.9)";
		var rgba4 = "rgba("+GetColorRGB(playerTheme.color_bg)+",0.4)";
		$(".bg9").css("background-color", rgba9);
		$(".bg4").css("background-color", rgba4);

		color_text = playerTheme.color_text.replace('#', '');
		$('.text-color').css('color', '#'+color_text);
		TAGS("body")[0].style.color = '#'+color_text;
	}
	
	
	if(playerTheme.play_center == '1'){
		$('.playpause').show();
	}else{
		$('.playpause').hide();
	}
	if(playerTheme.play_bar == '1'){
		$('.PlayBar').show();
	}else{
		$('.PlayBar').hide();
	}
	if(playerTheme.play_bottom == '1'){
		$('.PlayPause-bottom').show();
		bottomdisplay = true;
	}else{
		$('.PlayPause-bottom').hide();
	}
	if(playerTheme.control_volume == '1'){
		$('.Volume').show();
		bottomdisplay = true;
	}else{
		$('.Volume').hide();
	}
	if(playerTheme.timer == '1'){
		$('.timer').show();
		bottomdisplay = true;
	}else{
		$('.timer').hide();
	}
	if(playerTheme.logo_seen == '1'){
		$('.logo-bar').show();
	}else{
		$('.logo-bar').hide();
	}
	if(playerTheme.control_setting == '1'){
		$('.Settings-bar').show();
		bottomdisplay = true;
	}else{
		$('.Settings-bar').hide();
	}
	if(playerTheme.fullscreen == '1'){
		$('.fullscreen-bottom').show();
		bottomdisplay = true;
	}else{
		$('.fullscreen-bottom').hide();
	}
	if(playerTheme.tab_title == '1'){
		$('.title-bar').show();
	}else{
		$('.title-bar').hide();
	}
	if(playerTheme.tab_share == '1'){
		$('.share-bar').show();
		$('.embed-bar').show();
	}else{
		$('.share-bar').hide();
		$('.embed-bar').hide();
	}
	
}

$(document).ready(function(){
	setCurrentPlayerPreviews();
});
