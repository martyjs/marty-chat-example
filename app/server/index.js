require('babel/register');

var fs = require('fs');
var _ = require('lodash');
var util = require('util');
var path = require('path');
var uuid = require('uuid').v1;
var morgan = require('morgan');
var rooms = require('./rooms');
var express = require('express');
var Table = require('cli-table');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 5000;
var server = require('http').Server(app);
var io = require('socket.io')(server);

console.log('Running server http://localhost:' + port);
server.listen(port);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 5000);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(require('marty-express')({
  routes: require('../routes'),
  application: require('../application'),
  rendered: function (result) {
    console.log('Rendered ' + result.req.url);

    var table = new Table({
      colWidths: [30, 30, 30, 30, 40],
      head: ['Store Id', 'Fetch Id', 'Status', 'Time', 'Result']
    });

    _.each(result.diagnostics, function (diagnostic) {
      table.push([
        diagnostic.storeId,
        diagnostic.fetchId,
        diagnostic.status,
        diagnostic.time,
        JSON.stringify(diagnostic.result || diagnostic.error || {}, null, 2)
      ]);
    });

    console.log(table.toString());
  }
}));

app.use(express.static(path.join(__dirname, '..', '..', 'dist')));
app.use('/styles', express.static(path.join(__dirname, '..', 'styles')));
app.use('/node_modules', express.static(path.join(__dirname, '..', '..', 'node_modules')));

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