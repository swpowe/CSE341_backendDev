const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    required: [true, 'Please provide a valid email address.'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a valid password'],
  },
});

module.exports = mongoose.model('User', userSchema);

