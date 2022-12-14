const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// cors 옵션 설정
const safesitelist = [
  'http://localhost:3000',
  'http://localhost:6006',
  'https://www.b-i-nd.com',
  'https://b-i-nd.com',
];
const corsOptions = {
  origin(origin, callback) {
    const issafesitelisted = safesitelist.indexOf(origin) !== -1;
    callback(null, issafesitelisted);
  },
  credentials: true,
};

// 미들웨어 적용

app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

// socket.io 확장
const server = require('http').createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:3000',
      'https://www.b-i-nd.com',
      'https://b-i-nd.com',
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// DB 연결
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'), {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .catch(error => console.error(error));

// rest API routes

const { userRoute, chatRoute, postRoute } = require('./routes');

app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/chat', chatRoute);

// socket.io 구성
const socket = require('./socket');

socket(io);
// 서버 구동

server.listen(process.env.PORT || 8080, () => {
  console.log(`app listening on ${process.env.PORT || 8080}`);
});
