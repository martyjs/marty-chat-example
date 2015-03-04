var db = require('./db');
var _ = require('lodash');
var util = require('util');
var uuid = require('uuid').v1;
var EventEmitter2 = require('eventemitter2').EventEmitter2;

function Rooms() {
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

    db.set(room.id, room);
    emit('room:created', room);

    return room;
  }

  function getRoom(roomId) {
    var room = db.get(roomId);

    if (room) {
      return room;
    }
  }

  function getRoomMessages(roomId) {
    var room = db.get(roomId);

    if (room) {
      return room.messages;
    }

    return [];
  }

  function getAllRooms() {
    return _.values(db.get());
  }

  function addMessage(roomId, message) {
    var room = db.get(roomId);

    if (room) {
      _.defaults(message, {
        id: uuid()
      });

      room.messages.push(message);

      db.set(roomId, room);

      emit('message', message);

      return message;
    }
  }
}

util.inherits(Rooms, EventEmitter2);

module.exports = new Rooms();