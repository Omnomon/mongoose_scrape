//require packages

var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var request = require("request");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars")
handlebars=require('handlebars')
handlebars.registerHelper("debug", function(optionalValue) {
  console.log("Current Context");
  console.log("====================");
  console.log(this);
 
  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    console.log(optionalValue);
  }
});
// use mongoose 

var mongoose = require("mongoose");
mongoose.Promise = Promise;
mongoose.connect("mongodb://heroku_g0v150ph:ee24vfcqj8k6dmtg5ej4728rq8@ds161443.mlab.com:61443/heroku_g0v150ph" || 'localhost:27017/mongoose_scrape')
var db = mongoose.connection
// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});
//use express

var app = express();
var port = process.env.PORT || 3000
// set exphbs
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())
app.use("/public", express.static(__dirname + '/public'));


require('./routes/html.js')(app)

app.listen(port, function(){
	console.log(`app running on port ${port}`)
})