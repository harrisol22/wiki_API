
// all the crap you have to do to get this shit to work
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
mongoose.connect("mongodb://localhost:27017/wikiDB");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

// setting up the mongoDB database framework
const articlesSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articlesSchema);

// fetch all the articles
app.get("/articles", function(req, res) {
  Article.find({}, function(err, articles) {
    if(err){
      res.send(err);
    } else {
      res.send(articles);
    };
  });

});

app.listen(3000, function() {
  console.log("Server spinning on port 3000");
})
