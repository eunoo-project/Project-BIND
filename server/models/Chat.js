import mongoose from 'mongoose';

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

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
