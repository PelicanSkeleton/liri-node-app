require('dotenv').config();
var axios = require("axios");
var request = require("request");
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var omdb = keys.omdb.key;
var command = process.argv[2];
var searchCommand = process.argv.slice(3).join("+");

switch (command) {
  case ('spotify-this'):
    if (searchCommand) {
      spotifyThis(searchCommand);
    } else {
      spotifyThis("My heart will go on");
    };
    break;
  case ('concert-this'):
    break;
  case ('movie-this'):
    if(searchCommand) {
      movieThis(searchCommand);
    }
    break;
  case ('do-what-it-says'):
    break;

}



function spotifyThis(song) {
  spotify.search({ type: 'track', query: song, limit: 10 }, function (error, data) {
    if (!error) {
      for (var i = 0; i < data.tracks.items.length; i++) {
        var data = data.tracks.items[i];
        console.log("Artist: " + data.artists[0].name);
        console.log("Song: " + data.name);
        console.log("Preview URL: " + data.preview_url);
        console.log("Album: " + data.album.name);
        console.log("++++++++++++++++++++++++++++++");
      }
    } else {
      console.log('Error occurred.');
    }
  });
}

function movieThis(movie){
  axios.get("http://omdbapi.com?t=" + movie + "&apikey=b83e997c").then(function(response){
    console.log("Title: " + response.data.Title);
    console.log("Year Released: " + response.data.Year);
    console.log("Rating: " + response.data.imdbRating);
    console.log("Rotten Toms: " + response.data.Metascore);
    console.log("Production Country: " + response.data.Country);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
  });
  
};

