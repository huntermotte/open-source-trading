const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  user: [
      {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true}
      }
    ]
})
