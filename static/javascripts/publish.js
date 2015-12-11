
var sheetkey = '1K2v3VSv9xCrAmK5sTYFNwxE58DJ6K81xBRz6mYKsOeo';
var url = 'https://spreadsheets.google.com/feeds/cells/'+ sheetkey +'/1/public/values?alt=json-in-script&callback=?';

/*(function() {
  alert('fuck');
  $("#myQuestion").keypress(function(event){
    if(event.keyCode == 13){
      Ques = $("#myQuestion").val();
      postQuestion();
    }   
  });
})();*/

/*function postQuestion() {
  FB.api('/v2.5/me/feed', 'post', {
    message:Ques       
  }, function(response){
    if (!response || response.error) {
      alert('Error occured');
    } else {
      alert('Post ID: ' + response.id);
      console.log('Post ID: ' + response.id);
    }
  });
}*/

jQuery( document ).ready(function( $ ) {
  // variable to hold request
  var request;
  // bind to the submit event of our form
  $("#myQuestion").keypress(function(event){
    if(event.keyCode == 13){
      // abort any pending request
      if (request) {
        request.abort();
      }
      Ques = $("#myQuestion").val();
      FB.api('/v2.5/me/feed', 'post', {
        message:Ques       
      }, function(response){
        if (!response || response.error) {
          alert('Error occured');
        } else {
          alert('Post ID: ' + response.id);
          console.log('Post ID: ' + response.id);

          
          var serializedData = 'id='+response.id;
          request = $.ajax({
            url: "https://script.google.com/macros/s/AKfycbxtxaPavqu1owXpAWS0rO0CDlIfeW97t2l9Ep9gUBmld0LnT9ll/exec",
            type: "post",
            data: serializedData
          });
        
          // callback handler that will be called on success
          request.done(function (response, textStatus, jqXHR){
            // log a message to the console
            $('#result').html('<a href="https://docs.google.com/spreadsheets/d/1K2v3VSv9xCrAmK5sTYFNwxE58DJ6K81xBRz6mYKsOeo/edit#gid=0" target="_blank">Success - see Google Sheet</a>');
            console.log("Hooray, it worked!");
          });
        
          // callback handler that will be called on failure
          request.fail(function (jqXHR, textStatus, errorThrown){
            // log the error to the console
            console.error(
              "The following error occured: "+
              textStatus, errorThrown
            );
          });
        
          // callback handler that will be called regardless
          // if the request failed or succeeded
          request.always(function () {
            // reenable the inputs
            //$inputs.prop("disabled", false);
          });
        
          // prevent default posting of form
          event.preventDefault();

          $("#myQuestion").val('');
        }
      });

      
    }
  });
});