const router = require('express').Router();
const { Chat } = require('../models');
const { verifyToken } = require('../utils/verifyToken');

router.get('/', async (req, res) => {
  const { _id } = verifyToken(req.cookies.accessToken);

  const rooms = await Chat.find({ participants: { $in: _id } });

  res.send(rooms);
});

// 채팅방 찾기 미들웨어
const findRoom = async (req, res, next) => {
  const { _id: user1 } = verifyToken(req.cookies.accessToken);
  const { id: user2 } = req.params;

  // prettier-ignore
  let room = await Chat.findOne({ participants: { $in: [[user2, user1],[user1, user2]] }});

  if (!room) {
    room = new Chat({ participants: [user1, user2] });
    await room.save();
  }
  req.body.room = room;

  next();
};

router.get('/:id', findRoom, (req, res) => {
  res.send(req.body.room);
});

router.post('/:id', async (req, res) => {
  const { _id: id } = verifyToken(req.cookies.accessToken);
  const { id: _id } = req.params;
  const chat = { id, message: req.body.message };

  await Chat.findOneAndUpdate({ _id }, { $push: { chatting: chat } });

  res.end();
});

router.delete('/:id', async (req, res) => {
  await Chat.findOneAndDelete({ _id: req.params.id });
  res.end();
});

module.exports = router;
