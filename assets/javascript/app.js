$(document).ready(function () {
    
    $(".waves-effect").on("click", function () {
        var songName = $("#song-search").val().trim();
        youtubeQuery(songName);
        // lyricsQuery(songName)
    });
    
    function youtubeQuery(songName) {
        var youTubeURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=vevo%20" + songName + "&VideoEmbedded=true&key=AIzaSyBrUzOmwgzmZPFQ6rfWBY8-SyUp1C9LZ8Y";

        $.ajax({
            url: youTubeURL
            
        }).then( function (response) {
            console.log(response);
            var videoID = response.items[0].id.videoId
            $("#youtube-content").append("<iframe id='ytplayer' type='text/html' width='640' height='360' src='https://www.youtube.com/embed/"+ videoID + "?autoplay=1&origin=http:" + videoID + "?version=3' frameborder='0'></iframe>");
        });
    }



});

