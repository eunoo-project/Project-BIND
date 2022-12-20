const { Chat } = require('../models');

module.exports = io => {
  io.on('connection', socket => {
    socket.on('joinRoom', async ({ roomId, userId }) => {
      socket.join(roomId);

      const room = await Chat.findOne({ _id: roomId });
      const newChatting = room?.chatting.map(chat =>
        chat.id !== userId
          ? {
              ...chat._doc,
              isRead: true,
            }
          : { ...chat._doc }
      );

      await room?.updateOne({ chatting: newChatting });
    });

    socket.on('message', async ({ roomId, chat }) => {
      const time = Date.now();
      await Chat.findOneAndUpdate(
        { _id: roomId },
        { $push: { chatting: { ...chat, time } } }
      );
      io.to(roomId).emit('message', { ...chat, time });
    });
  });
};
