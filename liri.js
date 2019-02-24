
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
  if (!song) {
    let song = "the sign"
    spotify.search({ type: 'track', query: song })
    .then(function(response) {
         console.log(response.tracks);
      }) .catch(function(err) {
        console.log(err);
      })
  } else {
      spotify.search({ type: 'track', query: song })
        .then(function(response) {
          for (let i = 0; i < response.length; i ++) {
          console.log(response.tracks.items.album[i].name);
          /*console.log(response.track.items.album[0].name);
          console.log(response.track.items.album[0].preview_url);
          console.log(response.track.items.album[0].album.name);*/
          }
     }).catch(function(err) {
      console.log(err);
    });  
   }
  }


//This section is for the omdb movie request
if (request === 'movie-this') {
  let movieName = requestSpecific;
      console.log("searching for moive " + movieName);
      if (!movieName) {
        axios.get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy").then(
          function(response) {
              console.log(response.data.Title);
              console.log("This movie was released in " + response.data.Year);
              console.log("The movie's rating is: " + response.data.imdbRating + " on IMDB");
              console.log("This movie recived a Rotten Tomatoes rating of " + response.data.Ratings[1].Value);
              console.log("This movie was produced in " + response.data.Country);
              console.log("You can watch this movie in " + response.data.Language);
              console.log("Here is a plot summary: " + response.data.Plot);
              console.log("The following people star in this movie: " + response.data.Actors);
            }).catch(function(err) {
              console.log(err);
            })
      } else {
        axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(
        function(response) {
              console.log(response.data.Title);
              console.log("This movie was released in " + response.data.Year);
              console.log("The movie's rating is: " + response.data.imdbRating + " on IMDB");
              console.log("This movie recived a Rotten Tomatoes rating of " + response.data.Ratings[1].Value);
              console.log("This movie was produced in " + response.data.Country);
              console.log("You can watch this movie in " + response.data.Language);
              console.log("Here is a plot summary: " + response.data.Plot);
              console.log("The following people star in this movie: " + response.data.Actors);
        }).catch(function(err) {
          console.log(err);
        })
      };
    }

//this section is for the band's in town request
if (request === 'concert-this') {
  let artist = requestSpecific;
  console.log('finding your concerts for ' + artist)
  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
    function(response) {
      
        console.log(response.data);
        //console.log(response.data.venue.city);
        //console.log(response.data.datetime);
      
      }).catch(function(err) {
        console.log(err);
      })
    }  

//do what it says
if (request === 'do-what-it-says') {
    fs.readFile("random.txt", "utf8", function(response) {
        let responseArr = response.split(",");
        console.log(responseArr);
      }).catch(function(err) {
        console.log(err);
      })
    }