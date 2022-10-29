const mongoose = require('mongoose');

const {List} = require('./list');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    // eslint-disable-next-line max-len
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    required: [true, 'Please provide a valid email address.'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a valid password'],
  },
  list: [
    {
      type: List,
      required: yes,
    },
  ],
});

module.exports = mongoose.model('User', userSchema);

