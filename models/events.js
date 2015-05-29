var bcrypt = require("bcrypt");
var salt = bcrypt.genSaltSync(10);
var mongoose = require("mongoose");

var EventSchema = new mongoose.Schema({
    place: String,
    time: String,
    comment: String
});

var Events = mongoose.model("Events", EventSchema);

module.exports = Events;