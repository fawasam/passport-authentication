const express = require('express')
const ejs = require('ejs')
const app = express();
const bodyParser = require('body-Parser');
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport') 
const passportLocalMongoose = require('passport-local-mongoose')


app.use(express.static("public"))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))


app.use(session({
    secret: 'hesoyam',
    resave:false,
    saveUninitialized:false
}))

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/passportDB" ,{useNewUrlParser:true ,useUnifiedTopology:true});
mongoose.set("useCreateIndex" ,true)

const userSchema = new mongoose.Schema({
  email:String,
  password:String
});

userSchema.plugin(passportLocalMongoose);

const User =new mongoose.model("User" ,userSchema); 

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 


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
//secrets
app.get("/secrets", (req, res) => {
    if(req.isAuthenticated()) {
        res.render("secrets")
    }
    else{
        res.redirect("/login")
    }
})

//logout

app.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/")
})


//register 
app.post("/register", (req, res) => {

    User.register({username:req.body.username}, req.body.password, function(err,user){
        if(err)
        {
            console.log(err);
            res.redirect("/register")
        }
        else{
            passport.authenticate("local")(req,res, function(){
                res.redirect("/secrets")
            })
        }
    })
    
});

//login
app.post("/login", (req, res) => {

  const user = new User({
      username: req.body.username,
      password: req.body.password
  })
  req.login(user,function(err){
      if(err)
      {
          console.log(err)
      }
      else{
          passport.authenticate("local")(req,res,function(){
              res.redirect("/secrets")
          })
      }
  })

   
});



  

app.listen(3000, function () {
 console.log("hii you are in port 30000");
});
  