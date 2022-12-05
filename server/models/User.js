const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true, trim: true },
  imageURL: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  likePosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  binder: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  binding: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
  joinDate: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('User', userSchema);
