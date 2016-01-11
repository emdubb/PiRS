// Require resource's model(s).
var User = require("../models/user");
var Circle = require("../models/circle");

var index = function(req, res, next){

  User.find({}, function(error, users){
    res.render(
      'users/index', {users: users}
      // users
    );
  });
};

var show = function(req, res, next){
  User.find({spotifyId: req.params.spotifyId}, function(error, user){
    if (error) res.json({message: 'Could not find user because ' + error});
    res.render('users/show', {user: user});
  });
};

var currentUser = function(req, res, next){
  User.findById(req.user.id, function(error, user){
    if (error) res.json({message: 'Could not find user because ' + error});
    res.send({user});
  });
}

var userCircles = function(req, res, next) {
  // eval(locus)
  User.findById(req.params.id, function(error, user){
    if (error) {
      res.json({message: 'Could not find user because ' + error});
    } else {
      user.circles.forEach(function(userCircle) {
        Circle.findById(userCircle)
          .populate({path: 'users'})
          .exec(function(err, circle) {
            if (err) {
              console.log(err)
            } else {
              res.json({
                title: circle.title,
                users: circle.users
              });
              // console.log("Users: " + circle.users)
            }
          });
      });
    }

  })
}

module.exports = {
  index: index,
  show:  show,
  currentUser: currentUser,
  userCircles: userCircles
};

