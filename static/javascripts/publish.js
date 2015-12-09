var Ques = '';
var check = 0;

(function() {
	$("#myQuestion").keypress(function(event){
    //alert("yo_1");
      	if(event.keyCode == 13){
          //alert("yo_2");
        	Ques = $("#myQuestion").val();
        	if(check==1){
            //alert("yo_3");
        		postQuestion();
        	}else{
        		alert('Pleaseeeeee log into Facebook.')
        	}	
        }      
  	});
})();

function postQuestion() {
	alert("post!");
  	FB.api('/me/feed', 'post', {
      message:Ques       
    }, function(response){
   		if (!response || response.error) {
        	alert('Error occured');
    	} else {
        	console.log('Post ID: ' + response.id);
    	}
  	});
}

function checkLoginStateyo() {
  //alert("yes_1");
  	FB.getLoginStatus(function(response) {
  	  	statusChangeCallbackyo(response);
  	});
}

function statusChangeCallbackyo(response) {
  //alert("yes_2");
    if (response.status === 'connected') {
      	check=1;
    } else if (response.status === 'not_authorized') {
      alert('Please log into this app.');
    } else {
      alert('Please log into Facebook.')
  	}
}

