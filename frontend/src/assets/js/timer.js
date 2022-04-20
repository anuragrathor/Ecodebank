$(document).ready(function(e) {
		$(".thumbnail").click(function(e){
			var address= $(this).attr("src");
			$("#popup").fadeIn("slow");
			$("#lightbox").attr("src",address);
		});

		$("#close").click(function(){
			$("#popup").fadeOut("fast");
		});
		countdown();
});


var myVar;
function countdown(){
	if($("#hs_hours_counttime").length == 0){
		var d = new Date();
		$(".hs_hours").after('<input type="hidden" id="hs_hours_counttime" value="'+d+'">');
		countdown ();
	}
	else{
		var BigDay = new Date("20 January 2022, 11:00:00 AM GMT-0402"); 
		var msPerDay = 24 * 60 * 60 * 1000 ;
	   
		myVar = setInterval(function(){ 
					var today = new Date();
					var timeLeft = (BigDay.getTime() - today.getTime());
					
					var e_daysLeft = timeLeft / msPerDay;
					var daysLeft = Math.floor(e_daysLeft);
					
					var e_hrsLeft = (e_daysLeft - daysLeft)*24;
					var hrsLeft = Math.floor(e_hrsLeft);
					
					var e_minsLeft = (e_hrsLeft - hrsLeft)*60;
					var minsLeft = Math.floor(e_minsLeft);
					
					var e_secsLeft = (e_minsLeft - minsLeft)*60;
					var secsLeft = Math.floor(e_secsLeft);
					
					if (daysLeft < 10 && daysLeft >=0) daysLeft = "0" + daysLeft;
					if (hrsLeft < 10) hrsLeft = "0" + hrsLeft;
					if (minsLeft < 10) minsLeft = "0" + minsLeft;
					if (secsLeft < 10) secsLeft = "0" + secsLeft;
				   
					if(daysLeft < 0 || hrsLeft < 0 ||minsLeft < 0 ||secsLeft < 0 ){
						daysLeft = hrsLeft = minsLeft = secsLeft = "00";
					}
					
					var timeString = "<div class='tablerow row'>" + "</span>" + "<div class='col-3 px5'><div class='hrsbox'>" + daysLeft + "</div><div class='text-uppercase'>Days</div>" + "</div>" + "<div class='col-3 text-uppercase px5'><div class='hrsbox'>" + hrsLeft + "" +  "</div><div class=''>Hours</div></div>" + "" + "<div class='col-3 text-uppercase px5'><div class='hrsbox'>" + minsLeft + "</div><div class=''>Minutes</div>" + "</div>" + "" + "<div class='col-3 text-uppercase px5'><div class='hrsbox'>" + secsLeft + "" + "</div><div class='text-uppercase'>Seconds</div></div> \
		<div class='daystrip'><div class='timebox text-center f-12'></div>" + "" + "<div class='timebox'></div>" + "" + "<div class='timebox'></div>" + "" + "<div class='timebox'></div>" + "</div>";

					$('.hs_hours').html(timeString);
					
				}, 1000);

	}
}

function resetCountdown(){
	clearInterval(myVar);
	countdown();
}