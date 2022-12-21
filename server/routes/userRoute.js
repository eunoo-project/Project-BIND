const router = require('express').Router();
const sharp = require('sharp');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { uploadImage, deleteImage } = require('../utils/multer');
const { User } = require('../models');
const { verifyToken } = require('../utils/verifyToken');

router.get('/auth', async (req, res) => {
  try {
    const { userId } = verifyToken(req.cookies.accessToken);

    const authUser = await User.findOne({ userId });

    res.send({
      _id: authUser._id,
      userId: authUser.userId,
      imageURL: authUser.imageURL,
    });
  } catch (e) {
    console.log(e);
    res.send(false);
  }
});

router.get('/search', async (req, res) => {
  const { searchText } = req.query;

  const escapedTest = searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const regExp = new RegExp(escapedTest);

  const users = await User.find({ userId: { $regex: regExp } });

  const response = users.map(({ _id, userId, imageURL }) => ({
    _id,
    userId,
    imageURL,
  }));

  res.send(response);
});

// register -----------------------------------------------------
router.post('/register', async (req, res) => {
  // id 중복 체크
  const idExist = await User.findOne({ userId: req.body.userId });
  if (idExist) return res.send('이미 존재하는 id입니다.');

  // 패스워드 Hash
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // 유저 생성
  const user = new User({
    userId: req.body.userId,
    password: hashedPassword,
  });

  // 저장 및 토큰 생성 후 응답
  try {
    const savedUser = await user.save();
    const token = jwt.sign(
      { _id: user._id, userId: user.userId },
      process.env.TOKEN_SECRET
    );

    res.cookie('accessToken', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7d
      httpOnly: true,
      // domain: '.b-i-nd.com',
      secure: true,
    });

    const response = { _id: savedUser._id, userId: savedUser.userId };

    res.status(200).send(response);
  } catch (err) {
    res.status(400).send({ err, message: 'error' });
  }
});

// login -----------------------------------------------------
router.post('/signin', async (req, res) => {
  // 가입된 유저 판단
  const user = await User.findOne({ userId: req.body.userId });
  if (!user) return res.send('아이디 또는 비밀번호를 확인하세요.');

  // 패스워드 체크
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.send('아이디 또는 비밀번호를 확인하세요.');

  // 토큰 생성
  const token = jwt.sign(
    { _id: user._id, userId: user.userId },
    process.env.TOKEN_SECRET
  );

  res.cookie('accessToken', token, {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7d
    httpOnly: true,
    // domain: '.b-i-nd.com',
    secure: true,
  });

  const response = {
    _id: user._id,
    userId: user.userId,
    imageURL: user.imageURL,
  };

  res.status(200).send(response);
});

// logout -----------------------------------------------------
router.post('/signout', (req, res) => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
  res.end();
});

// userInfo -----------------------------------------------------
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { _id } = verifyToken(req.cookies.accessToken);

  const user = await User.findOne({ _id: id }).populate('posts');

  const response = {
    userInfo: {
      _id: user._id,
      userId: user.userId,
      imageURL: user.imageURL,
      postCnt: user.posts.length,
      binderCnt: user.binder.length,
      bindingCnt: user.binding.length,
      isBinding: user.binder.includes(_id),
    },
    posts: user.posts
      .map(post => ({
        ...post._doc,
        author: { _id: user._id, userId: user.userId, imageURL: user.imageURL },
      }))
      .sort((a, b) => b.publishDate - a.publishDate),
  };

  res.send(response);
});

// bind -----------------------------------------------------
router.patch('/bind/:id', async (req, res) => {
  const { id: opponent } = req.params;
  const { _id: me } = verifyToken(req.cookies.accessToken);

  const { type } = req.body;

  if (type === 'bind') {
    await User.findOneAndUpdate({ _id: me }, { $push: { binding: opponent } });
    await User.findOneAndUpdate({ _id: opponent }, { $push: { binder: me } });
  }

  if (type === 'unbind') {
    await User.findOneAndUpdate({ _id: me }, { $pull: { binding: opponent } });
    await User.findOneAndUpdate({ _id: opponent }, { $pull: { binder: me } });
  }

  res.end();
});

// 프로필 이미지 변경 -----------------------------------------------------
router.patch('/profile', uploadImage.single('profile'), async (req, res) => {
  const { _id } = verifyToken(req.cookies.accessToken);

  const imageURL = req.file.path;
  if (!imageURL) return res.status(400).send('이미지가 존재하지 않습니다.');

  sharp(req.file.path) // 압축할 이미지 경로
    .resize({ width: 68 }) // 비율을 유지하며 가로 크기 줄이기
    .withMetadata() // 이미지의 exif데이터 유지
    .toBuffer((err, buffer) => {
      if (err) throw err;
      // 압축된 파일 새로 저장(덮어씌우기)
      fs.writeFile(req.file.path, buffer, err => {
        if (err) throw err;
      });
    });

  const user = await User.findOne({ _id });

  if (user.imageURL) deleteImage(user.imageURL);

  await user.updateOne({ imageURL });

  res.end();
});

module.exports = router;
