const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// cors 옵션 설정
const safesitelist = ['http://localhost:3000'];
const corsOptions = {
  origin(origin, callback) {
    const issafesitelisted = safesitelist.indexOf(origin) !== -1;
    callback(null, issafesitelisted);
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// socket.io 확장
const server = require('http').createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
  path: '/chat',
});

// DB 연결
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'), {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .catch(error => console.error(error));

// rest API routes

app.get('/', (req, res) => {
  res.send('<div style="width:100px; height:100px; background:red">성공</div>');
});

app.get('/test', (req, res) => {
  res.send(
    '<div style="width:100px; height:100px; background:yellow">test</div>'
  );
});

// socket.io 구성

io.on('connection', socket => {
  console.log('hi', socket.id);
  // io.emit('event_name', msg);
});

// 서버 구동

server.listen(process.env.PORT || 5500, () => {
  console.log(`app listening on ${process.env.PORT || 5500}`);
});