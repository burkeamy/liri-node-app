
require("dotenv").config()
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require('axios');
var request = process.argv[2];

var spotify = new Spotify(keys.spotify)

if (request === 'spotify-this-song') { 
  var song = process.argv[3];
  spotify
    .search({ type: 'track', query: song })
   .then(function(response) {
     console.log(response);
  })
    .catch(function(err) {
    console.log(err);
  });
}

if (request === 'movie-this') {
  var movieName = process.argv[3];
  if (movieName === ' ') {
    axios.get("http://www.omdbapi.com/?t=Mr._Nobody&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log("The movie's rating is: " + response.data.imdbRating);
    } 
  }) else {
      axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(
      function(err, response) {
      console.log("The movie's rating is: " + response.data.imdbRating);
  })
}

if (request === 'concert-this') {
  var artist = process.argv[3];
  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
  console.log(response);
  })
    .catch(function(err) {
    console.log(err)
}