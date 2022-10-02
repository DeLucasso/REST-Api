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
// mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });
mongoose.connect('mongodb://localhost:27017/wikiDB',
    { useUnifiedTopology: true,
     useNewUrlParser: true }
);

// Let's create a schema with two items (title, content) in document.
const articleSchema = {
  title: String,
  content: String
};
//
// const newPost = {
//   title: "New Post Of The Week",
//   content: "What a beautiful day in L.A. is today, and also will be tomorrow!"
// };

// Let's create a model from the schema
const Article = mongoose.model("Article", articleSchema);

// app.get("/", function (req,res){
//   console.log("Ok /");
// });

// app.get("/", function (req, res){
// });

// Let's get all items from Article document
app.get("/articles", function (req, res){
  Article.find({}, function(err, foundArticles) {
  });
});

//lets' create the post route so API can send the article and title
app.post("/articles", function (req,res){
  console.log(req.body.title);
  console.log(req.body.content);
});

app.listen(3000, function(){
console.log("Server is running at port 3000");
}
);
