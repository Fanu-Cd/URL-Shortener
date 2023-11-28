const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
          long: { type: String, required: true },
          short: { type: String, required: false },
          url: { type: String, required: false },
          user_id:{type:String,required:false}
},{collection:"URLShortener"});

const Data = mongoose.model('Data', dataSchema);
module.exports = Data