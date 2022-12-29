const router = require('express').Router();
const sharp = require('sharp');
const fs = require('fs');
const { uploadImage, deleteImage } = require('../utils/multer');
const { User, Post } = require('../models');
const { verifyToken } = require('../utils/verifyToken');

router.get('/', async (req, res) => {
  if (!req.cookies.accessToken) return res.send(false);
  try {
    const { _id } = verifyToken(req.cookies.accessToken);

    const { binding } = await User.findOne({ _id });

    const posts = await Post.find({ author: { $in: [_id, ...binding] } })
      .populate(['author', 'like'])
      .sort({
        publishDate: -1,
      });

    const response = posts.map(post => ({
      ...post._doc,
      like: post.like,
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
  const { _id: userId } = verifyToken(req.cookies.accessToken);

  sharp(req.file.path) // 압축할 이미지 경로
    .resize({ width: 500 }) // 비율을 유지하며 가로 크기 줄이기
    .withMetadata() // 이미지의 exif데이터 유지
    .toBuffer((err, buffer) => {
      if (err) throw err;
      // 압축된 파일 새로 저장(덮어씌우기)
      fs.writeFile(req.file.path, buffer, err => {
        if (err) throw err;
      });
    });

  const post = new Post({
    author: userId,
    description: req.body.description,
    imageURL: req.file.path,
    publishDate: new Date(),
  });

  const user = await User.findOne({ _id: userId });
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
