var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/WeGetFit");


module.exports.User = require("./user");
module.exports.Events = require("./events");