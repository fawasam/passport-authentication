const express = require('express')
const ejs = require('ejs')
const app = express();
const bodyParser = require('body-Parser');
const mongoose = require('mongoose')
var session = require('express-session')


app.use(express.static("public"))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect("mongodb://localhost:27017/passportDB" ,{useNewUrlParser:true ,useUnifiedTopology:true});
const userSchema = new mongoose.Schema({
  email:String,
  password:String
});
const User =new mongoose.model("User" ,userSchema); 

//home
app.get("/", (req, res) => {
    res.render("home");
});  
//register 
app.get("/register", (req, res) => {
    res.render("register");
});
//login
app.get("/login", (req, res) => {
    res.render("login");
});






//register 
app.post("/register", (req, res) => {
    res.render("register");
});

//login
app.post("/login", (req, res) => {
    res.render("login");
});



  

app.listen(3000, function () {
    console.log("hii you are in port 30000");
});
  