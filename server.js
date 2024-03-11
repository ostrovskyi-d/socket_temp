const express = require('express');
const http = require('http');

const cors = require('cors');
const socketIo = require('socket.io');

const app = express();

app.use(cors({
  origin: '*', 
}));

const options = {
  requestCert: false,
  rejectUnauthorized: false,
};

const server = http.createServer(options);

const io = socketIo(server, {
  cors: {
    origin: "*",
  }
});

io.on('connection', (socket) => {
  console.log('A user connected: ' + socket.id);

  socket.on('message', (data) => {
    socket.broadcast.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 8081;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
