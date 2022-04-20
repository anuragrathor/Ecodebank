<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
</head>
<body style="background-color: transparent;">
<div>
	<div style="">
		<img src="lapi3.png" class="center-block img-responsive" style="position:absolute;max-height: 100%;max-width: 100%;margin: auto;left: 0;right: 0;top: 0;bottom: 0;">
		<div style="position: relative;margin: auto;" id="iframe">
		<iframe style="width: 100%;height: 100%;position: absolute;" src="https://dev.dotcompaltest.com/video/embed/gc4mv9u129" allowfullscreen="" class="embed-responsive-item" frameborder="0"></iframe>
		</div>
	</div>
</div>
<script>
$(document).ready(function(){
    $(window).resize(function(){
        var top = $('img').offset().top;
        var left = $('img').offset().left;
		if(top > 0){
			var top_mr = 6;//update it 
			var marg = $('img').height();
			$('#iframe').css('width', '78%');
			$('#iframe').css('height', "auto");
			$('#iframe').css('top', top + top_mr*marg/100);
			$('#iframe').css('left', 0);
			$('#iframe').css('right', 0);
			$('#iframe').css('padding-bottom', '45.25%');
			$('iframe').css('top', 0);
			
		}
		
		
		if(left > 0){
			var left_mr = 0.78;//update it 
			var width = ($('img').width()) * left_mr;
			$('#iframe').css('width', width);
			$('#iframe').css('height', width*.56);
			$('#iframe').css('top', '0');
			$('#iframe').css('left', 0);
			$('#iframe').css('right', 0);
			$('#iframe').css('padding-bottom', 0);
			$('iframe').css('top', '8%');
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