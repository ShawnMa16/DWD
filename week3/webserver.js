var express = require('express');
var mongojs = require('mongojs');
var user = require("./config.js");

var app = express();

var db = mongojs(user.username + ":" + user.password +
  "@ds229878.mlab.com:29878/testing", ["contacts"]);

// var path = require("path");

app.use(express.static('public'));

app.set('view engine', 'ejs');

var count = 0;

// app.get('/display', function(req, res) {
//   app.render('display.ejs', {
//     test: 8});
// });

app.get('/emailRec', function (req,res) {

  var obj = new Object();
   obj.name = req.query.name;
   obj.email  = req.query.email;
   obj.content = req.query.content;
   var contacts= JSON.stringify(obj);

  // var tempString = '{"contacts" : {"name":req.query.name, "email":eq.query.email, "content":req.query.content}}'
  db.contacts.save(JSON.parse(contacts), function(err, saved) {
    if( err || !saved ) console.log("Not saved");
      else console.log("Saved");
  });

  res.redirect('/display');

});

app.get('/display', function(req, res) {

  db.contacts.find({}, function(err, saved) {
    if (err || !saved) {
    	console.log("No results");
    }
    else saved.forEach(function(record) {
      res.render('display.ejs', {thedata:saved});
    	console.log(record);
  	});

  	/* Alternatively you could loop through the records with a "for"
  	for (var i = 0; i < saved.length; i++) {
	  	console.log(saved[i]);
	}
	*/
  });
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
