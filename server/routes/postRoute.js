const router = require('express').Router();
const { uploadImage, deleteImage } = require('../utils/multer');
const { User, Post } = require('../models');
const { verifyToken } = require('../utils/verifyToken');

router.get('/', async (req, res) => {
  const { _id } = verifyToken(req.cookies.accessToken);
  const { binding } = await User.findOne({ _id });

  const posts = await Post.find({ author: { $in: [_id, ...binding] } }).sort({
    publishDate: -1,
  });

  res.send(new Date(posts[0].publishDate).toLocaleString());
});

router.post('/', uploadImage.single('post'), async (req, res) => {
  const post = new Post({
    author: req.body.author,
    description: req.body.description,
    imageURL: req.file.path,
  });

  const user = await User.findOne({ _id: req.body.author });
  await user.updateOne({
    posts: [post._id, ...user.posts],
  });

  await post.save();

  res.end();
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;

  await Post.findOneAndUpdate(
    { _id: id },
    { description: req.body.description }
  );

  res.end();
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const post = await Post.findOne({ _id: id });
  deleteImage(post.imageURL);

  const user = await User.findOne({ _id: post.author });

  await user.updateOne({
    posts: [...user.posts.filter(_id => !_id.equals(post._id))],
  });

  post.delete();

  res.end();
});

router.patch('/like/:id', async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = verifyToken(req.cookies.accessToken);

  await Post.findOneAndUpdate(
    { _id: id },
    { $push: { like: userId }, $inc: { likeCnt: req.body.value } }
  );

  res.end();
});

router.patch('/unlike/:id', async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = verifyToken(req.cookies.accessToken);

  await Post.findOneAndUpdate(
    { _id: id },
    { $pull: { like: userId }, $inc: { likeCnt: req.body.value } }
  );

  res.end();
});

module.exports = router;
