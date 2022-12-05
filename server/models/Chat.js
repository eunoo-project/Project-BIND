const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  participants: [{ type: String }],
  chatting: [
    {
      id: String,
      message: String,
      idRead: Boolean,
      time: { type: Date, default: Date.now() },
    },
  ],
});

module.exports = mongoose.model('Chat', chatSchema);
