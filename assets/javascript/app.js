$(document).ready(function() {
    $(".carousel").carousel();
    var recentSearches;
    var recentSongsFromLocalStorage = localStorage.getItem("song");

    if (recentSongsFromLocalStorage) {
        recentSearches = JSON.parse(recentSongsFromLocalStorage);
    } else {
        recentSearches = [];
    }

    function renderButton() {
        $("#recent").empty();
        for (var i = 0; i < recentSearches.length; i++) {
            var newButton = $("<button>");
            newButton.addClass("recentSong");
            newButton.text(recentSearches[i]);
            $("#recent").append(newButton);
        }
        //     JSON.parse(localStorage.getItem("song"));
    }

    $("#submit-button").on("click", function() {
        var songName = $("#song-search")
            .val()
            .trim();
        recentSearches.push(songName);
        localStorage.setItem("song", JSON.stringify(recentSearches));
        youtubeQuery(songName);
        lyricsQuery(songName);
        // tasteQuery(songName);//work in progress
        renderButton();
    });

    function youtubeQuery(songName) {
        var youTubeURL =
            "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=vevo%20" +
            songName +
            "&VideoEmbedded=true&key=AIzaSyBrUzOmwgzmZPFQ6rfWBY8-SyUp1C9LZ8Y";

        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/" + youTubeURL
        }).then(function(response) {
            var videoID = response.items[0].id.videoId;
            $(".video-container").append(
                "<iframe id='ytplayer' type='text/html' width='300' height='300' src='https://www.youtube.com/embed/" +
                    videoID +
                    "?autoplay=1&origin=http:" +
                    videoID +
                    "?version=3' frameborder='0'></iframe>"
            );
        });
    }

    function lyricsQuery(songName) {
        // get object of "song" from genius
        // find url and put in lyricsURL var
        var accessToken =
            "aB5kqaAZECyzU--9LkDp_QGCygvr42-91fCx7GBJGezunSnjw-bas1K5yeHlhK0H";
        var geniusURL =
            "https://api.genius.com/search?q=" +
            songName +
            "&access_token=" +
            accessToken;

        $.ajax({
            url: geniusURL,
            method: "GET"
        }).then(function(response) {
            $("#lyrics-content").empty();
            var lyricsURL = response.response.hits[0].result.url;
            var artist = response.response.hits[0].result.primary_artist.name;
            tasteQuery(artist);
            // console.log(lyricsURL)
            $.ajax({
                url: "https://cors-anywhere.herokuapp.com/" + lyricsURL,
                method: "GET"
            }).then(function(response) {
                var songLyricsLinesList = $(response)
                    .find(".lyrics")
                    .find("p")
                    .text()
                    .split("\n");

                for (i = 0; i < songLyricsLinesList.length; i++) {
                    var songLineDiv = $("<div>").addClass("songline");
                    $(songLineDiv).text(songLyricsLinesList[i]);
                    $(songLineDiv).appendTo("#lyrics-content");
                }
            });
        });
        function tasteQuery(artist) {
            var tasteDiveURL =
                "https://cors-anywhere.herokuapp.com/" +
                "https://tastedive.com/api/similar?q=" +
                artist +
                "&type=band&limit=5&k=341252-project1-GORKXH3A";
            // + artistName +

            $.ajax({
                url: tasteDiveURL,
                method: "GET"
            }).then(function(response) {
                // console.log( response.Similar.Results[0].Name)
                var artistNamesArray = response.Similar.Results.map(function(
                    artist
                ) {
                    return artist.Name;
                });
                $(".related-content");
            });
        }
    }

    renderButton();
});
