$(document).ready(function () {
    
    $(".waves-effect").on("click", function () {
        var songName = $("#song-search").val().trim();
        youtubeQuery(songName);
        // lyricsQuery(songName)
    });
    
    function youtubeQuery(songName) {
        var youTubeURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&channelId=UC2pmfLm7iq6Ov1UwYrWYkZA&q=" + songName + "&key=AIzaSyBrUzOmwgzmZPFQ6rfWBY8-SyUp1C9LZ8Y";

        $.ajax({
            url: youTubeURL
        }).then( function (response) {
            console.log(response);
            // $("#youtube-content").html("<iframe id='ytplayer' type='text/html' width='640' height='360' src=https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http:" + youTubeURL + ">");
        });
    }



});

