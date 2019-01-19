const express = require("express");
const exphbs = require("express-handlebars")
const mongoose = require("mongoose");
const bodyParser = require('body-parser')

// Scraping tools
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

    db.Article.find({})
        .then(function (data) {
            console.log(data)
            var hbsObject = {
                articles: data
            };

            res.render("index", hbsObject);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// route to saved
app.get("/saved", function (req, res) {

    db.Article.find({})
        .then(function (data) {
            console.log(data)
            var hbsObject = {
                articles: data
            };

            res.render("saved", hbsObject);
        })
        .catch(function (err) {
            res.json(err);
        });
});


// https://arstechnica.com/gaming/
// https://arstechnica.com/gadgets/
// https://echojs.com
app.get("/scrape", function (req, res) {
    request("https://arstechnica.com/gadgets/", function (error, response, body) {
        const $ = cheerio.load(body);

        $("li").each(function (i, element) {
            let result = {};

            result.title = $(this)
                .find("h2")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");
            result.description = $(this)
                .find("p.excerpt")
                .text();

            db.Article
                .create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
                });
        });
        res.redirect("/");
    });
});

// show ALL articles in json response
app.get("/articles", function (req, res) {
    db.Article.find({})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// Route for grabbing a specific Article by id
// NO BUTTON
app.get("/find/:id", function (req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article
        .findOne({ _id: req.params.id })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// Route for updating a specific article save status
app.put("/update/:id", function (req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article
        .findOne({ _id: req.params.id })
        .update({ $set: { "saved": true } })
        .catch(function (err) {
            res.json(err);
        });
});

// Route for deleting a specific article
app.delete("/delete/:id", function (req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article
        .remove({ _id: req.params.id })
        .then(res.render("index"))
        .catch(function (err) {
            res.json(err);
        });
});

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
// =======================================================================