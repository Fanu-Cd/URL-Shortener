const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
          fname: { type: String, required: true },
          lname: { type: String, required: false },
          email: { type: String, required: false },
          password: { type: String, required: false },
},{collection:"URLShortenerUser"});

const Data = mongoose.model('User', dataSchema);
module.exports = Data