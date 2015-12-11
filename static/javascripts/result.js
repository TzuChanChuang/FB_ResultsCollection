var sheetkey = '1K2v3VSv9xCrAmK5sTYFNwxE58DJ6K81xBRz6mYKsOeo';
var url = 'https://spreadsheets.google.com/feeds/cells/'+ sheetkey +'/1/public/values?alt=json-in-script&callback=?';
var ques_id = [];
var posts = [];

$.getJSON(url, function(data) {
    result = data.feed.entry;
    for (var i = 0; i < result.length; i++){
        if(result[i].gs$cell.col == 1 && result[i].gs$cell.row > 1){
            ques_id.push(result[i].gs$cell.$t);
        }
    }
}).then(function(){
    getPost();
});

function getPost() {
    var post_now = 0;
    // Create a deferred object
    var dfd = $.Deferred();
    console.log('ques_id.length = '+ ques_id.length);
    for(var i=0; i<ques_id.length; i++){
        (function (i) {
            FB.getLoginStatus(function(response) {
                FB.api('/' + ques_id[i] + '?fields=from,message', function(response) {
                    if (response && !response.error) {
                        console.log(response);
                        posts.push({});
                        posts[post_now].post = response.message;
                        posts[post_now].id = ques_id[i];
                        post_now = post_now + 1;
                    }else{
                    }
                    console.log(posts.length);
                    if(ques_id.length==posts.length){
                        dfd.resolve();
                    }
                });
            });
        })(i);
        
    }
    $.when(dfd).done(function() {
        console.log(posts.length);
        for(var i=0; i<posts.length; i++){
            var link = "/result/" + posts[i].id;
            document.getElementById("posts").innerHTML = document.getElementById("posts").innerHTML + '<a href="' + link + '" ><p class="borderexample" style="width: 40%;">' + posts[i].post + '</p></a></div>';
        }
    });
}
