const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const serviceContent = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const app = express();

mongoose.connect("mongodb://localhost:27017/ekdantamDB", {useNewUrlParser: true});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const formSchema = {
  f_name: String,
  l_name: String,
  email: String,
  phn_no: String,
  message: String
}

const reviewSchema = {
  name: String,
  rev_msg: String
}

const Form = mongoose.model("form",formSchema);
const Review = mongoose.model("review",reviewSchema);

app.get("/", function(req, res){
  Review.find({},function(err,reviews){
    res.render("home", {reviews: reviews});
  })
});

app.post("/", function(req, res){
  const review = new Review({
    name: req.body.name,
    rev_msg: req.body.rev_msg
  });
  review.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });
});

app.get("/services", function(req, res){
  res.render("services", {serviceContent: serviceContent});
});

app.get("/appointment", function(req, res){
  res.render("appointment");
});

app.post("/appointment", function(req,res){
  const form = new Form({
    f_name: req.body.f_name,
    l_name: req.body.l_name,
    email: req.body.email,
    phn_no: req.body.phn_no,
    message: req.body.message
  });
  form.save(function(err){
    if(!err){
      res.redirect("/appointment");
    }
  });
});

app.get("/gallery", function(req, res){
  res.render("gallery");
});

app.get("/about", function(req, res){
  res.render("about");
});

app.get("/contact", function(req, res){
  res.render("contact");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
