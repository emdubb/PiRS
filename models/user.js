var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    debug    = require('debug')('app:models:user');

var spotify = require('../config/spotifyApiHelper');

var userSchema = new Schema({
  displayName:  String,
  email:        String,
  spotifyId:    String,
  profileImage: String,
  created:      { type: Date, default: Date.now },
  accessToken:  String,
  circles:      [{ type: Schema.Types.ObjectId, ref: 'Circle' }]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
