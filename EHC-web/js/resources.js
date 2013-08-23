$(document).ready(function(){

	$('#bookOption .bookOptions a').eq(0).click(function(e){
		$('#bookOption').slideUp(500);
		$('#contentWrapper #bookRoom').slideDown(1500);
	});
	
	$('#bookRoom .button').click(function(e){
		var data = {name:'', email:'', phone:0, nperson:0, date:'', time_from:'', time_upto:'', reason:''};
		
		//extract data
		
		//send data
		$.post("php/api.php", {method : 'bookRoom', data : data},function(retData){
				if(retData.head.status == 200){//accepted
					
				}else{
					
				}
			}, "json");	
		
		$('#contentWrapper #bookRoom').slideUp(1000);	
		$('#bookOption').slideDown(1500);
		
	});

});