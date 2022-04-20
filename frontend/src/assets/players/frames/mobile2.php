<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<style>
.screen-center-img{position:absolute;max-height: 100%;max-width: 100%;margin: auto;left: 0;right: 0;top: 0;bottom: 0;}
.div-wrapper{position: relative;margin: auto;}
.frame-height{width: 100%;height: 100%;position: absolute;}
</style>
</head>
<body>

<div>
		<img src="mobile2.png" class="center-block img-responsive screen-center-img">
		<div class="div-wrapper" id="iframe">
		<iframe src="https://dev.dotcompaltest.com/video/embed/7jraeefmex" allowfullscreen="" class="frame-height embed-responsive-item" frameborder="0"></iframe>
		</div>
	</div>

<script>
$(document).ready(function(){
    $(window).resize(function(){
        var top = $('img').offset().top;
        var left = $('img').offset().left;
		
		if(top > 0 && left > 0){
			var left_mr = 0.82;//update it 
			var top_mr = 5.0;//update it 
			var marg = $('img').height();
			var width = ($('img').width()) * left_mr;
			$('#iframe').css('width', width);
			$('iframe').css('height', width*.52);
			$('#iframe').css('top', top + top_mr*marg/100);
			$('#iframe').css('left', 0);
			$('#iframe').css('right', 0);
			$('#iframe').css('padding-bottom', '44.50%');
			$('iframe').css('top', 0);
			return;
		}
		
		if(left > 0){
			var left_mr = 0.82;//update it 
			var width = ($('img').width()) * left_mr;
			$('#iframe').css('width', width);
			$('#iframe').css('height', width*.52);
			$('#iframe').css('left', 0);
			$('#iframe').css('right', 0);
			$('#iframe').css('padding-bottom', 0);
			$('iframe').css('top', '1.5%');
			$('iframe').css('height', '100%');
			$('#iframe').css('top', 0);
			return;
		}
		
		
		if(top > 0){
			var top_mr = 5.0;//update it 
			var marg = $('img').height();
			$('#iframe').css('width', '78%');
			$('#iframe').css('height', "auto");
			$('#iframe').css('top', top + top_mr*marg/100);
			$('#iframe').css('left', 0);
			$('#iframe').css('right', 0);
			$('#iframe').css('padding-bottom', '43.50%');
			$('iframe').css('height', '100%');
			return;
		}
		
		
		
		
    });
	$(window).resize();
	$("img").on("load", function() {
		$(window).resize();
	});
});
</script>
</body>
</html>