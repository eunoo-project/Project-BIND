import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageURL: { type: String, required: true },
  description: String,
  like: [],
  likeCnt: { type: Number, default: 0 },
  tags: [{ type: String }],
  publishDate: { type: Date, default: Date.now(), required: true },
  editDate: { type: Date },
});

const Post = mongoose.model('Post', postSchema);
export default Post;
