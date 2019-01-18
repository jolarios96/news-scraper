const express = require("express");
const exphbs = require("express-handlebars")
const mongoose = require("mongoose");
const bodyParser = require('body-parser')

// Our scraping tools
// maybe axios
const request = require('request');
const cheerio = require("cheerio");

// Require all models
const db = require("./models/");

const PORT = 3000;

// Initialize Express
const app = express();

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Configure middleware===========================================================
// Parse request body as JSON
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/articleDB", { useNewUrlParser: true });

// Routes =========================================================================
// route to index
app.get("/", function (req, res) {
    res.render("index", {
        msg: "Welcome",
    });
});
// 404 route (On unkown route)
app.get("*", function (req, res) {
    res.render("404");
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
