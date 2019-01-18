var express = require("express");
var mongoose = require("mongoose");

// Our scraping tools
// maybe axios
var cheerio = require("cheerio");

// Require all models
var db = require("./models/");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/articleDB", { useNewUrlParser: true });

// Routes
// route to index
app.get("/", function (req, res) {
    res.render("index", {
        msg: "Welcome",
    });
});


// A GET route for scraping articles
app.get("/scrape", function (req, res) {

    // Send a message to the client
    res.send("Scrape Complete");
});

// Route for getting all Articles from the db
app.get("/articles", function (req, res) {

});

// Route for grabbing a specific Article by id
app.get("/articles/:id", function (req, res) {
// req.params.id
});

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
