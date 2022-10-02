// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set ("viewengine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
  }));
app.use(express.static("public"));


// This command is just for solving some mongoose errors, it's not necessary
// {useNewUrlParser: true}
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", {useNewUrlParser: true});

// Let's create a schema with two items (title, content) in document.
const articleSchema = {
  title: String,
  content: String
};

// Let's create a model from the schema
const Article = mongoose.model("Article", articleSchema);

// Let's get all items from Article document
app.get("/articles", function(req, res){
  Article.find(function(err, foundArticles) {
    if (!err){
      res.send(foundArticles);
      console.log("foundArticles has been found and sent as response");
    } else {
      res.send(err);
    }
  });
});

// ----------------------------------------------------------------------
//lets' create the post route so API can send the article and title
app.post("/articles", function(req, res){
  // Let's save the title and content that was posted via API POST to the DB:
  const newArticle = new Article ({
    title: req.body.title,
    content: req.body.content
  });
  // Let's save it to the DB here:
  // newArticle.save();

newArticle.save(function(err){
    if (!err){
      res.send("Sucessfully added a new article");
      console.log(req.body.title, "/", req.body.content);
    } else {
      res.send(err);
    }
  });
});
// ----------------------------------------------------------------------

app.delete("/articles", function(req, res){
Article.deleteMany(function(err){
  if (!err) {
    res.send("Deleted All Articles!");
    console.log("Deleted All Articles!");
  } else {
    res.send(err);
  }
});
});

app.listen(3000, function(){
console.log("Server is running at port 3000");
}
);
