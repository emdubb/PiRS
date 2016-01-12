var User    = require('../models/user');
var Circle  = require('../models/circle');
var spotify = require('../config/spotifyApiHelper');
var locus   = require('locus');
var async   = require('async');

var indexUser = function(req, res) {
  User.find({}, function(err, records) {
    res.json(records);
  });
};

var displayCircleUsers = function(req, res) {
    Circle.find({'_id': req.query._id }).populate('users').exec(function(err, circle){
        console.log(circle);
        // res.json(circle);
        return circle;
    });
};


module.exports = {
  indexUser: indexUser,
  displayCircleUsers: displayCircleUsers
}
