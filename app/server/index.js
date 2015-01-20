var fs = require('fs');
var _ = require('lodash');
var util = require('util');
var path = require('path');
var uuid = require('uuid').v1;
var morgan = require('morgan');
var rooms = require('./rooms');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 5000;
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(port);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 5000);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', '..', 'dist')));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/rooms/:id', function (req, res) {
  res.render('index');
});

app.get('/api/rooms', function(req, res) {
  res.json(rooms.getAllRooms()).end();
});

app.post('/api/rooms', function (req, res) {
  var room = rooms.createRoom(req.body);

  res.json(room).status(201).end();
});

app.post('/api/rooms/:roomId/messages', function(req, res) {
  var message = rooms.addMessage(roomId(req), req.body);

  res.json(message).status(201).end();
});

app.get('/api/rooms/:roomId/messages', function (req, res) {
  var messages = rooms.getRoomMessages(roomId(req));

  res.json(messages).end();
});

rooms.on('*', function() {
  console.log.apply(console, _.union([this.event], _.toArray(arguments)));
});

io.on('connection', function(socket) {
  rooms.on('*', function() {
    var args = _.toArray(arguments);
    args.unshift(this.event);
    socket.emit.apply(socket, args);
  });
});

function roomId(req) {
  return req.params.roomId;
}