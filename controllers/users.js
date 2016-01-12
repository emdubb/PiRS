// Require resource's model(s).
var User = require("../models/user");
var Circle = require("../models/circle");
var async  = require('async');

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

// var allUserCircles = [];




var userCircles = function(req, res, next) {
  var allUserCircles = [];
  var itemsProcessed = 0;
  User.findById(req.params.id, function(error, user){
    user.circles.forEach(function(userCircle) {
      Circle.findById(userCircle)
        .populate({path: 'users'})
        .exec(function(err, circle) {
          if (err) {
            console.log(err)
          } else {
            // console.log(circle);
            allUserCircles.push(circle);
            itemsProcessed++;

            if (itemsProcessed === user.circles.length) {
              res.json({
                circles: allUserCircles
              })
            }
            // console.log("Users: " + circle.users)
          }
        });
    });
  });
}




// var userCircles = function(req, res, next) {
//   var allUserCircles = [];
//   async.series([
//     function(callback) {
//       User.findById(req.params.id, function(error, user){
//         user.circles.forEach(function(userCircle) {
//           Circle.findById(userCircle)
//             .populate({path: 'users'})
//             .exec(function(err, circle) {
//               if (err) {
//                 console.log(err)
//               } else {
//                 // console.log(circle);
//                 allUserCircles.push(circle)
//                 // console.log("Users: " + circle.users)
//               }
//             });
//         });

//         callback(null, "one");
//       })
//     },
//     function(callback) {
//       console.log(allUserCircles);
//       callback(null, "two");
//     }
//   ])
// }




// var userCircles = function(req, res, next) {

//   User.findById(req.params.id, function(error, user){
//       if (error) {
//         res.json({message: 'Could not find user because ' + error});
//       } else {

//         // var allUserCircles = user.circles.map(populateCircle);
//         // setTimeout(function(){eval(locus)}, 5000);

//         var allUserCircles = [];

//         function populateCircles(array) {
//           array.forEach(function(userCircle) {
//             Circle.findById(userCircle)
//               .populate({path: 'users'})
//               .exec(function(err, circle) {
//                 if (err) {
//                   console.log(err)
//                 } else {
//                   // console.log(circle);
//                   console.log("blarf")
//                   allUserCircles.push(circle);
//                   // console.log("Users: " + circle.users)
//                 }
//               });
//           })
//         }

//         // populateCircles(user.circles);
//         // setTimeout(function(){console.log(allUserCircles)}, 5000)

//         return new Promise(function(resolve, reject) {
//           resolve(populateCircles(user.circles))
//         }).then(
//           function(result) {
//             console.log(allUserCircles);
//           }
//         )

//       }
//   });


// }





// var userCircles = function(req, res, next) {
//   var theFuckingCircles = [];
//   var promise =
//     User
//       .findOne({_id: req.params.id}).exec()
//       .then(function(user) {
//         if (user) {
//           return user.circles.forEach(function(userCircle) {
//             Circle.findById(userCircle)
//               .populate({path: 'users'})
//               .exec(function(err, circle) {
//                 if (err) {
//                   console.log(err)
//                 } else {
//                   // console.log(circle)
//                   // return circle;
//                   theFuckingCircles.push(circle);
//                 }
//               }).then(function(result){console.log(result);resolve(result)});
//           });
//         } else {
//           res.json({message: 'Could not find user because ' + error});
//         }
//       }).then(
//         function(result) {
//          console.log(theFuckingCircles)
//         }
//       )

//   return promise
// }


// var userCircles = function(req, res, next) {
//   // return new Promise(function (resolve, reject) {
//     var userPromise = User.findById(req.params.id, function(error, user){
//     if (error) {
//       res.json({message: 'Could not find user because ' + error});
//     } else {
//       // allUserCircles = [];
//         return new Promise(function (resolve, reject) {
//           console.log("bawlawls")
//           var allUserCircles = user.circles.map(function(userCircle) {
//               Circle.findById(userCircle)
//                 .populate({path: 'users'})
//                 .exec(function(err, circle) {
//                   if (err) {
//                     console.log(err)
//                   } else {
//                     return circle;
//                   }
//                 });
//             });

//           resolve(allUserCircles);
//         });

//       }
//     });
//     userPromise.then(
//       function(result) {
//         console.log(result)
//         // resolve(result)
//         // console.log("here are all user circles: " + allUserCircles);
//         // res.json({
//         //   circles: allUserCircles
//         // });
//       },
//       function(err) {
//         debug("Could not populate circles!", err);
//       }
//     )
  // });


// }












// var userCircles = function(req, res, next) {
//   // eval(locus)
//   var promises = new Promise(function (resolve, reject) {
//     User.findById(req.params.id, function(error, user){
//     if (error) {
//       res.json({message: 'Could not find user because ' + error});
//     } else {
//       // allUserCircles = [];
//       var circlesPromises = new Promise(function (resolve, reject) {
        // var allUserCircles = user.circles.map(function(userCircle) {
        //     Circle.findById(userCircle)
        //       .populate({path: 'users'})
        //       .exec(function(err, circle) {
        //         if (err) {
        //           console.log(err)
        //         } else {
        //           // console.log(circle);
        //           return circle;
        //           // console.log("Users: " + circle.users)
        //         }
        //       });
        //   });

//         resolve(allUserCircles);
//       });
//       }
//     })
//     resolve();
//   })


//   Promise.all(promises).then(
//     function(result) {
//       console.log(result)
//       // console.log("here are all user circles: " + allUserCircles);
//       // res.json({
//       //   circles: allUserCircles
//       // });
//     },
//     function(err) {
//       debug("Could not populate circles!", err);
//     }
//   );

// }

module.exports = {
  index: index,
  show:  show,
  currentUser: currentUser,
  userCircles: userCircles
};

