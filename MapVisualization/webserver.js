var express = require('express');
var mongojs = require('mongojs');
var user = require("./source/config.js");

var app = express();

var db = mongojs(user.username + ":" + user.password +
  "@ds229878.mlab.com:29878/testing", ["maze_info"]);

// var db = mongojs("shawnma:mx1994516@ds229878.mlab.com:29878/testing", ["maze_info"]);
// var path = require("path");
//mongodb://<dbuser>:<dbpassword>@ds229878.mlab.com:29878/testing
// mongodb://<dbuser>:<dbpassword>@ds255258.mlab.com:55258/urban_maze

app.use(express.static('public'));
app.use(express.static('source'));

app.set('view engine', 'ejs');

let dataFromDB = [];

app.get('/urbanmaze', function (req, res) {

  db.maze_info.find({}, function (err, saved) {
    if (err || !saved) {
      console.log("No results");
    } else {
      //set the dataset to empty;
      dataFromDB = [];

      for (let i = 0; i < saved.length; i++) {
        dataFromDB.push(saved[i]);
        // console.log(saved[i]);
      }

      console.log(dataFromDB);
      res.json(dataFromDB);
    }
  });

  /* Alternatively you could loop through the records with a "for"
  	for (var i = 0; i < saved.length; i++) {
	  	console.log(saved[i]);
	}
  */
});
// });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

// module.exports = app;