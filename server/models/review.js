const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    description: { type: String },
    overall_score:{type: Number},
    element: {type: Object},
  });

  module.exports = mongoose.model('review', ReviewSchema);