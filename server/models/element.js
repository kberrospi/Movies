const mongoose = require('mongoose');
const category = require('./category');


const ElementSchema = new mongoose.Schema({
    idp:{type: Number},
    name: { type: String },
    image: { type: String },
    category: [{type: Object}],
    overview: {type: String},
  });

  module.exports = mongoose.model('element', ElementSchema);