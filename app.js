// Dependencies
const express = require("express");
const request = require("request");
const config = require("./config");

// App
const app = express();
app.set("view engine", "ejs");

// API credentials
const API = "http://www.omdbapi.com/?";
const key = config.key;

// Routing

app.get("/", (req, res) => {
  res.render("search");
});


app.get("/results", (req, res) => {
  let searchTerm = req.query.search;
  let URL = `${API}&apikey=${key}&s=${searchTerm}`;
  request(URL, (error, respond, body) => {
    // Verify if we are good
    if (error || respond.statusCode != 200) {
      console.error("Not good!!!");
    } else {
      // Becuase the body is a string JSON-ify it
      let parseData = JSON.parse(body);

      // Check if we have data about the movie
      // if(parseData.)
      let response = parseData.Response;
      if (response == "True") {
        let movies = parseData.Search;
        res.render("movies", { movies: movies, searchTerm: searchTerm });
      } else {
        res.redirect("/");
      }
    }
  });;
})

// Server stuff
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("App started"));
