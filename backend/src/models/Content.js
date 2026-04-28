const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  module: { type: String, enum: ['GK','DSA','Hindi','Paper 1','Paper 2','System Design'], required: true },
  type: { type: String, enum: ['note','question','file'], required: true },
  category: String,
  folder: String,
  title: { type: String, required: true },
  body: String,
  questionLink: String,
  videoLink: String,
  tags: [String],
  bookmarked: { type: Boolean, default: false },
  files: [{ url: String, filename: String, mimeType: String }],
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);
