const router = require('express').Router();
const { Chat } = require('../models');
const { verifyToken } = require('../utils/verifyToken');

router.get('/', async (req, res) => {
  if (!req.cookies.accessToken) return res.send(false);

  const { _id } = verifyToken(req.cookies.accessToken);
  const rooms = await Chat.find({ participants: { $in: _id } }).populate([
    'participants',
  ]);

  const response = rooms
    .map(room => {
      const opponent = room.participants.filter(
        user => !user._id.equals(_id)
      )[0];

      const unreadCnt = room.chatting.filter(
        chat => !chat.isRead && chat.id !== _id
      ).length;
      return {
        roomId: room._id,
        opponent: {
          _id: opponent._id,
          userId: opponent.userId,
          imageURL: opponent.imageURL,
        },
        lastChat: room.chatting[room.chatting.length - 1],
        unreadCnt,
      };
    })
    .sort(
      (b, a) =>
        (a.lastChat?.time || new Date()) - (b.lastChat?.time || new Date())
    );

  res.send(response);
});

// 채팅방 찾기 미들웨어
const findRoom = async (req, res, next) => {
  const { _id: user1 } = verifyToken(req.cookies.accessToken);
  const { id: user2 } = req.params;

  try {
    // prettier-ignore
    let room = await Chat.findOne({ participants: { $in: [[user2, user1],[user1, user2]] }});

    if (!room) {
      room = new Chat({ participants: [user1, user2] });
      await room.save();
    }
    req.body.room = room;

    next();
  } catch (e) {
    res.end();
  }
};

router.get('/:id', findRoom, (req, res) => {
  res.send(req.body.room);
});

router.get('/alarm/unread', async (req, res) => {
  if (!req.cookies.accessToken) return res.send(false);

  const { _id } = verifyToken(req.cookies.accessToken);

  const rooms = await Chat.find({ participants: { $in: _id } });

  const unreadCnt = rooms
    ?.map(room => room.chatting)
    .flat(1)
    ?.filter(chat => !chat.isRead && chat.id !== _id).length;

  if (!rooms || unreadCnt <= 0) return res.send(false);

  res.send(true);
});

module.exports = router;
