var express = require('express');
var mongojs = require('mongojs');
var user = require("./config.js");

var app = express();

var db = mongojs(user.username + ":" + user.password +
  "@ds229878.mlab.com:29878/testing", ["contacts"]);

// var path = require("path");

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.send('Hello World!')
});

var count = 0;

app.get('/somethingelse', function(req, res) {
  count++;
  // res.send('<html><body><h1> somethingelse' + count +'</h1></body></html>')
  res.send('<html><body><h1> somethingelse' + count + '</h1></body></html>')
});

app.get('/display', function(req, res) {
  app.render('display.ejs', {
    test: 8});
});

// app.get('/emailRec', function (req, res) {
//   console.log("They submitted it: " + req.query.textfield)
//   // res.send("They submitted it: " + req.query.textfield);
//   // res.sendFile(path.join(__dirname + '/public/form.html'));
//   res.render('test' , { title: 'InfoRecieved', name: req.query.name,
// email: req.query.email, content: req.query.content });
//
// });

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});

// module.exports = app;
