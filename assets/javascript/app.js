$(document).ready(function () {
    $('.carousel').carousel();
    $(".waves-effect").on("click", function () {
        var songName = $("#song-search").val().trim();
        youtubeQuery(songName);
        lyricsQuery(songName);
        console.log(songName)
    });
    
    function youtubeQuery(songName) {
        var youTubeURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=vevo%20" + songName + "&VideoEmbedded=true&key=AIzaSyBrUzOmwgzmZPFQ6rfWBY8-SyUp1C9LZ8Y";

        $.ajax({
            url: youTubeURL
            
        }).then( function (response) {
            console.log(response);
            var videoID = response.items[0].id.videoId
            $(".video-container").append("<iframe id='ytplayer' type='text/html' width='300' height='300' src='https://www.youtube.com/embed/"+ videoID + "?autoplay=1&origin=http:" + videoID + "?version=3' frameborder='0'></iframe>");
        });
    }

    function lyricsQuery(songName){
        // get object of "song" from genius
        // find url and put in lyricsURL var
        var geniusURL = "https://api.genius.com/search?q=" + songName;

        $.ajax({
            url: geniusURL,
            method: "GET",
            Authorization: "Bearer rVizdCDy5l-5zaheg4xZSWhYGCGGLdjCPn1465cveWXMPXyGBhlwUiFq40jx4mSO"
        }).then(function(response){
            // var lyricsURL = response.item[0].url;
            console.log(response)
            // $.ajax({
            //     url: "https://cors-anywhere.herokuapp.com/" + lyricsURL,
            //     method: "GET",
            // }).then(function(response) {
            //     var yo = $(response).find(".lyrics").text();
            //     console.log(yo);
            //     console.log(response)
            //     $("#lyrics-content").append(yo);
            // });
        });
    }



});

