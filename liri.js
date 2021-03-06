require('dotenv').config();
var axios = require("axios");
var keys = require("./keys.js");
var moment = require("moment");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var omdb = keys.omdb.key;
var bit = keys.bit.key;
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
    if (searchCommand) {
      concertThis(searchCommand);
    }
    break;
  case ('movie-this'):
    if (searchCommand) {
      movieThis(searchCommand);
    }
    break;
  case ('do-what-it-says'):
    doWhatItSays();
    break;
  default:
    console.log("Please type a proper command. ie: 'spotify-this', 'concert-this', 'movie-this' or 'do-what-it-says'.");
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
    } 
  });
}

function movieThis(movie) {
  axios.get("http://omdbapi.com?t=" + movie + "&apikey=" + omdb).then(function (response) {
    console.log("Title: " + response.data.Title);
    console.log("Year Released: " + response.data.Year);
    console.log("Rating: " + response.data.imdbRating);
    console.log("Rotten Toms: " + response.data.Metascore);
    console.log("Production Country: " + response.data.Country);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
    console.log("++++++++++++++++++++++++++++++");

  });

};

function concertThis(concert) {
  axios
    .get("http://rest.bandsintown.com/artists/" + concert + "/events?app_id=" + bit)
    .then(function (response) {
      console.log("Artist lineup: " + response.data[0].lineup);
      console.log("Venue: " + response.data[0].venue.name);
      console.log("City: " + response.data[0].venue.city);
      console.log("Date of event: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
      console.log("++++++++++++++++++++++++++++++");

    })
}

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (err, data) {
    data = data.split(",");
    command = data[0];
    searchCommand = data[1];

    switch (command) {
      case ('spotify-this'):
        if (searchCommand) {
          spotifyThis(searchCommand);
        } else {
          spotifyThis("My heart will go on");
        };
        break;
      case ('concert-this'):
        if (searchCommand) {
          concertThis(searchCommand);
        }
        break;
      case ('movie-this'):
        if (searchCommand) {
          movieThis(searchCommand);
        }
        break;
      default:
        console.log("Please type a proper command. ie: 'spotify-this', 'concert-this', 'movie-this' or 'do-what-it-says'.");
        break;

    }


  })
}

