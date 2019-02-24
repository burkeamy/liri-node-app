
require("dotenv").config()
const keys = require('./keys.js');
const Spotify = require('node-spotify-api');
const axios = require('axios');
const request = process.argv[2];
const requestSpecific = process.argv.slice(3).join(' ');
const spotify = new Spotify(keys.spotify)
const fs = require("fs");

//This section is for the spotify song request
if (request === 'spotify-this-song') { 
  let song = requestSpecific;
  console.log('searcing for ' + song)
  spotify.search({ type: 'track', query: song })
   .then(function(err, response) {
     if(err) {
       console.log(err);
     } else {
     console.log(response.data);
    }  
  });
}

//This section is for the omdb movie request
if (request === 'movie-this') {
  let movieName = requestSpecific;
  console.log("searching for " + movieName)
    if (!movieName) {
    axios.get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy").then(
    function(err, response) {
      if(err) {
        console.log(err); 
        console.log(response);
      } else {
      axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(
      function(err, response) {
        console.log(err);
        console.log(response);
       //console.log("The movie's rating is: " + response.data.imdbRating);
      });
    };
  });
  }
}

//this section is for the band's in town request
if (request === 'concert-this') {
  console.log('concert')
  let artist = requestSpecific;
  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
    function(err, response) {
      if(err){
        console.log(err);
      } else {
      console.log(response.data);
      }
    });
  }   

//do what it says
if (request === 'do-what-it-says') {
    fs.readFile("random.txt", "utf8", function(err, response) {
      if(err) {
        console.log(err);
      } else {
        let responseArr = response.split(",");
        console.log(responseArr);
      }
    });
}