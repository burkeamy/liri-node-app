
require("dotenv").config()
const keys = require('./keys.js');
const Spotify = require('node-spotify-api');
const axios = require('axios');
const request = process.argv[2];
const requestSpecific = process.argv.slice(3).join(' ');
const spotify = new Spotify(keys.spotify)
const fs = require("fs");
const divider = "\n------------------------------------------------------------\n\n";

//const random = require('./random.txt')

//This section is for the spotify song request
if (request === 'spotify-this-song') { 
  let song = requestSpecific;
  console.log('searcing for ' + song)
  console.log(divider);
  if (!song) {
    let song = "the sign ace of base"
    spotify.search({ type: 'track', query: song })
    .then(function(response) {
        console.log("Your song is sung by " + response.tracks.items[0].artists[0]);
        console.log("This song is called " + response.tracks.items[0].name);
        console.log("Here is a link to preview the song: " + response.tracks.items[0].preview_url);
        console.log("This song is from the album " + response.tracks.items[0].album.name);
      }) .catch(function(err) {
        console.log(err);
      })
  } else {
      spotify.search({ type: 'track', query: song })
        .then(function(response) {
          for (let i = 0; i < response.tracks.items.length; i ++) {
            console.log("Your song is sung by " + response.tracks.items[i].artists[0]);
            console.log("This song is called " + response.tracks.items[i].name);
            console.log("Here is a link to preview the song: " + response.tracks.items[i].preview_url);
            console.log("This song is from the album " + response.tracks.items[i].album.name);
            console.log(divider);
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
      console.log(divider);
      if (!movieName) {
        axios.get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy").then(
          function(response) {
              console.log("Information for " + response.data.Title);
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
              console.log("Information for " + response.data.Title);
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
  console.log(divider);
  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
    function(response) {
      for (j = 0; j < response.data.length; j++){
        console.log(artist + " is playing at " + response.data[j].venue.name);
        console.log("This venue is located in " + response.data[j].venue.city + " " + response.data[j].venue.region);
        console.log("The show will be on " + response.data[j].datetime);
        console.log(divider);
        }
      }).catch(function(err) {
        console.log(err);
      })
    }  

//do what it says
if (request === 'do-what-it-says') {
    /*fs.readFile("random.txt", "utf8", function(data) {
        let dataArr = response.split(",");
        console.log("You are searching for " + data);*/
      let song = "I want it that way";
      spotify.search({ type: 'track', query: song })
      .then(function(response) {
        console.log("Your song is sung by " + response.tracks.items[0].artists);
        console.log("This song is called " + response.tracks.items[0].name);
        console.log("Here is a link to preview the song: " + response.tracks.items[0].preview_url);
        console.log("This song is from the album " + response.tracks.items[0].album.name);
        }).catch(function(err) {
        console.log(err);
      })
    }