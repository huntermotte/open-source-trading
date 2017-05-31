const bcyrpt = require('bcyrptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
  user: [
      {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        ideas: [
          {
            security: {type: String, required: true},
            trade: {type: String, required: true},
            description: {type: String, required: true}
          }
        ]
      }
    ]
});

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
}

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
}

const User = mongoose.model('User', userSchema);

module.exports = {User};
