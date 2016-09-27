var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

// allows socket.io to run alongside express
var server = http.Server(app);
// creates a socket.io server, which is an eventEmitter
var io = socket_io(server);

// add listener to the connection event of the server, this will be called when new client connects to socket.io server
io.on('connection', function (socket) {
  console.log('Client connected');

  socket.on('message', function (message) {
    console.log('Received message:', message);
    socket.broadcast.emit('message', message);
  });
});

server.listen(process.env.PORT || 8080);
