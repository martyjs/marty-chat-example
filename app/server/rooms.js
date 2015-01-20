var _ = require('lodash');
var util = require('util');
var uuid = require('uuid').v1;
var EventEmitter2 = require('eventemitter2').EventEmitter2;

function Rooms() {
  var rooms = {};

  this.getRoom = getRoom;
  this.addMessage = addMessage;
  this.createRoom = createRoom;
  this.getAllRooms = getAllRooms;
  this.getRoomMessages = getRoomMessages;
  this.state = {};

  EventEmitter2.call(this, {
    wildcard: true
  });

  var emit = _.bind(this.emit, this);

  function createRoom(room) {
    _.defaults(room, {
      id: uuid(),
      messages: []
    });

    rooms[room.id] = room;
    emit('room:created', { room: room });

    return room;
  }

  function getRoom(roomId) {
    var room = rooms[roomId];

    if (room) {
      return room;
    }
  }

  function getRoomMessages(roomId) {
    var room = rooms[roomId];

    if (room) {
      return room.messages;
    }

    return [];
  }

  function getAllRooms() {
    return _.values(rooms);
  }

  function addMessage(roomId, message) {
    var room = rooms[roomId];

    if (room) {
      room.messages.push(message);

      emit('message', {
        message: message,
        room: room.id
      });

      return message;
    }
  }
}

util.inherits(Rooms, EventEmitter2);

module.exports = new Rooms();