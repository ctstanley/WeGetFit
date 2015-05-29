var express = require('express'),
    bodyParser = require('body-parser'),
    path = require("path"),
    _ = require("underscore"),
    logger = require("morgan"),
    db = require("./models"), // require the models for db
    session = require("express-session"),
    app = express();

app.use(logger('dev'));
app.use(express.static(__dirname + '/views'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'super secret',
    resave: false,
    saveUninitialized: true
}));

var path = require("path");
var views = path.join(process.cwd(), "views");

// pre-seeded post data
var events = [{
    id: 0,
    place: "Dolores Park",
    time: "9:00am",
    comment: "test"
}, {
    id: 1,
    place: "Potrero Hill",
    time: "6:00am",
    comment: "test"
}, {
    id: 2,
    place: "Golden Gate Panhandle",
    time: "5:30pm",
    comment: "test"
}, {
    id: 3,
    place: "Presidio",
    time: "7:00pm",
    comment: "test"
}];

// add ps data to the data base
var addPosts = function(eventList) {
    for (var i = 0; i < eventList.length; i++) {
        db.Events.create({
            place: eventList[i].place,
            time: eventList[i].time
        });
    }
};
addPosts(events);


// Make connection to main page
app.get("/home", function(req, res) {
    res.sendFile(path.join(views, "Htmls/home.html"));
});

app.get("/events", function (req, res){
  // find all events
  db.Events.find({}, function(err, results){
    // send them as JSON-style string
    res.send(JSON.stringify(results));
  })
});

app.post("/events", function (req, res){
  // find new event in the req.body
  var newEvent = req.body;
  // add the new event to our db (mongoose will give it an _id)
  db.Events.create(newEvent);
  // respond with the created object as json string
  res.send(JSON.stringify(newEvent));
});

app.delete("/events/:id", function (req, res){
  // remove item in the db matching the id
  db.Events.remove({_id: req.params.id}, function(err, results){
    if (err){
      res.status(500).send({ error: 'database error' });
    } else {
      res.status(200).send();
    }
  });
});

// have same template as login
app.get("/", function(req, res) {
    res.sendFile(path.join(views, "Htmls/home1.html"));
});

// add unique user to database
app.post("/signup", function(req, res) {
    var user = req.body.user;
    // console.log(req.body.user);
    db.User.
    createSecure(user.email, user.password,
        function() {
          console.log(user.email)
            res.redirect("/");
        });
});

app.post("/login", function(req, res) {
    var user = req.body.user;


    db.User
        .authenticate(user.email, user.password,
            function(err, user) {
                console.log("LOGGING IN!");
                // req.login(user);
                res.redirect("/home");
            });
});

app.get("/login", function(req, res) {
    res.sendFile(path.join(views, "Htmls/home.html"));

});

app.listen(process.env.PORT || 3000);