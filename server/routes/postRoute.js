const router = require('express').Router();
const { uploadImage, deleteImage } = require('../utils/multer');
const { User, Post } = require('../models');
const { verifyToken } = require('../utils/verifyToken');

router.get('/', async (req, res) => {
  try {
    const { _id } = verifyToken(req.cookies.accessToken);

    const { binding } = await User.findOne({ _id });

    const posts = await Post.find({ author: { $in: [_id, ...binding] } })
      .populate('author')
      .sort({
        publishDate: -1,
      });

    const response = posts.map(post => ({
      ...post._doc,
      author: {
        _id: post.author._id,
        userId: post.author.userId,
        imageURL: post.author.imageURL,
      },
    }));
    res.send(response);
  } catch (e) {
    console.log(e);
  }
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
  const { _id: userId } = verifyToken(req.cookies.accessToken);

  if (req.body.description) {
    await Post.findOneAndUpdate(
      { _id: id },
      { description: req.body.description, editDate: new Date() }
    );
  }

  if (req.body.like === 'add') {
    await Post.findOneAndUpdate(
      { _id: id },
      { $push: { like: userId }, $inc: { likeCnt: 1 } }
    );
  }

  if (req.body.like === 'remove') {
    await Post.findOneAndUpdate(
      { _id: id },
      { $pull: { like: userId }, $inc: { likeCnt: -1 } }
    );
  }

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

module.exports = router;
