const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  chatting: [
    {
      id: String,
      message: String,
      isRead: { type: Boolean, default: false },
      time: { type: Date, default: Date.now() },
    },
  ],
});

module.exports = mongoose.model('Chat', chatSchema);
