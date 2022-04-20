var videoprocess_call = 0;
function ProcessStatus(){
	$.post('https://videowhizz.saglus.com/videowhizz_server/videoprocessstatus/ikhh7l8zgl',
	{},
	function(data, status){
		if((data == 0) && videoprocess_call > 0){
			location.reload();
		}else{
			if(data > 0){
				if(parseInt(data) == 100){
				$(".title-bar").html("Processing complete 99%");
				}else{
					$(".title-bar").html("Processing complete " + parseInt(data) + "%");
				}
				videoprocess_call++;
				ProcessStatus();
			}
		}
		
	});	
}