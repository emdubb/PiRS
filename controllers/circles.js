var User    = require('../models/user');
var Circle  = require('../models/circle');
var api     = require('../controllers/api');
var spotify = require('../config/spotifyApiHelper');

var debug = require('debug')('app:circles')

var debugAs = function(additional) {
  return function(message) {
    debug(message, additional);
  }
};

// var locus   = require('locus');
// var async   = require('async');

var createCircle = function(req, res, done) {
  var circleUsersSpotifyIds = JSON.parse(req.body.users);
  eval(locus);
  // add the creator to the list of users od the circle!
  circleUsersSpotifyIds.push(req.user.spotifyId);

  Circle
    .create({
      creator: req.user._id,
      title:   req.body.title
    })
    .then(
      function(circle) {
        debug("Circle created: " + circle.title);
        return circle.addUsers(circleUsersSpotifyIds);
      },
      function(err) {
        debug("Could not create circle!", err);
      }
    ).then(function(circle) {
      // res.status(200);
      res.json(circle);
    });
};

var updateCircle = function(req, res) {
    var circle = api.displayCircleUsers(req, res);
};

var destroyCircle = function(req, res) {

  var circleId = req.params.id;
  var userIdsForDelete = [];


  Circle.findById(circleId, function(err, circle){
    if(err) return res.status(err.statusCode || 500).json(err);
    circle.users.forEach(function(user){
      userIdsForDelete.push(user);
    });

    userIdsForDelete.forEach(function (userId){
      User.findById(userId, function (err, user){

        user.circles.forEach(function(userCircleToDelete){

          var userStringify = JSON.stringify(userCircleToDelete._id);
          var userParse = JSON.parse(userStringify);

          if (userParse === circleId) {
            var index = user.circles.indexOf(userCircleToDelete);
            user.circles.splice(index, 1);

            if (!user.circles.circleId) {
              user.save(function (err){
              if (err) return res.status(err.statusCode || 500).json(err);
              //res.json(user);
              });
            }
          }

        });

      });
    });

    circle.remove();

  });

};

module.exports = {
  createCircle: createCircle,
  updateCircle: updateCircle,
  destroyCircle: destroyCircle
}
