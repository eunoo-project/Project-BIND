const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageURL: { type: String, required: true },
  description: String,
  like: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  likeCnt: { type: Number, default: 0 },
  tags: [{ type: String }],
  publishDate: { type: Date, default: Date.now() },
  editDate: { type: Date },
});

module.exports = mongoose.model('Post', postSchema);
