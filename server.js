var express = require("express");
var logger = require("mongoose");

// scraping tools
// axios maybe
var cheerio = require("cheerio")

// require models
var db = require("./models")

var PORT = 3000;

// init. Express
var app = express();

// configure middleware

// Parse requet body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// make public a static folder
app.use(express.static("public"));

// Connect to Mongo DB

// Routes ==================================================

// GET route to scrape website------------------------------
app.get("/scrape", function (req, res) {


    res.send("Scrap Complete");
});

// GET route, get Articles from the db
app.get("/articles", function (req, res) {

});

// Server start ============================================
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
