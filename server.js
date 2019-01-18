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

app.get("/scrape", function (req, res) {
    request("#", function (error, response, body) {
        var $ = cheerio.load(body);

        // Now, we grab every h2 within an article tag, and do the following:
        $("article h2").each(function (i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    // If an error occurred, log it
                    console.log(err);
                });
        });
        console.log("Scrape compleete");
        res.send("Scrape Complete");
        // res.send(response.body);
    });
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
// =======================================================================