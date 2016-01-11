var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    async    = require('async'),
    debug    = require('debug')('app:models:circle');

var User = require('./user');

// mongoose.Promise = Promise; // TODO: is this necessary?

var circleSchema = new Schema({
  title:   String,
  creator: { type: Schema.Types.ObjectId, ref: 'User'},
  created: { type: Date, default: Date.now },
  users:   [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

circleSchema.methods.addUsers = function(usersSpotifyIds) {
  var circle = this;

  debug("Adding users to circle: ", usersSpotifyIds);

  return new Promise(function(resolve, reject) {
    async.each(usersSpotifyIds, function(userSpotifyId, next) {
      debug("Adding user " + userSpotifyId + " to circle.");

      findOrCreateUserInDb(userSpotifyId)
        .then(function(user) {
          return addUserToCircle(user, circle)
        })
        .then(function(user) {
          next();
        })
    }, function() {
      debug("All users added to circle!")
      resolve(circle);
    });
  });
};

var Circle = mongoose.model('Circle', circleSchema);

module.exports = Circle;

function findOrCreateUserInDb(spotifyId) {
  var promise =
    User
      .findOne({spotifyId: spotifyId}).exec()
      .then(function(user) {
        if (user) {
          debug(`${spotifyId} already exists.`);
          return user;
        } else {
          debug(`${spotifyId} not in db. Creating...`);
          return User.create({spotifyId: spotifyId});
        }
      });

  return promise;
}

function addUserToCircle(user, circle) {
  debug(`Pushing user ${user.spotifyId} in to circle: ${circle.title}`);
  circle.users.push(user._id)

  var promise =
    circle.save()
      .then(
        function(circle) {
          return addCircleToUser(user, circle)
        },
        function(other) {
          debug("fail")
        }
      );

  return promise;
}

function addCircleToUser(user, circle) {
  debug(`Pushing circle ${circle.title} in to user ${user.spotifyId}`);
  user.circles.push(circle._id)
  return user.save();
}
