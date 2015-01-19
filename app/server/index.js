var fs = require('fs');
var _ = require('lodash');
var util = require('util');
var path = require('path');
var uuid = require('uuid').v1;
var app = require('express')();
var morgan = require('morgan');
var rooms = require('./rooms');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 5000);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', '..', 'dist')));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/api/rooms', function(req, res) {
  res.json(rooms.getAll()).end();
});

app.post('/api/rooms', function (req, res) {
  var room = rooms.createRoom(req.body);

  res.status(201).json(room).end();
});

app.post('/api/rooms/:roomId/messages', function(req, res) {
  rooms.addMessage(roomId(req), req.body);

  res.status(201).end();
});

app.get('/api/rooms/:roomId/messages', function (req, res) {
  var messages = rooms.getRoomMessages(roomId(req));

  res.json(messages).end();
});

app.post('/api/rooms/:roomId/members/:email', function (req, res) {
  rooms.addRoomMember(roomId(req), req.params.email);

  res.status(200).end();
});

app.delete('/api/rooms/:roomId/members/:email', function (req, res) {
  rooms.removeRoomMember(roomId(req), req.params.email);

  res.status(204).end();
});

rooms.on('*', function() {
  console.log.apply(console, _.union([this.event], _.toArray(arguments)));
});

function roomId(req) {
  return parseInt(req.params.roomId);
}

io.on('connection', function(socket) {
  rooms.on('*', function() {
    var args = _.toArray(arguments);
    args.unshift(this.event);
    socket.emit.apply(socket, args);
  });
});

module.exports = app;