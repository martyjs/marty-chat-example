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
  this.addRoomMember = addRoomMember;
  this.getRoomMessages = getRoomMessages;
  this.removeRoomMember = removeRoomMember;
  this.state = {};

  EventEmitter2.call(this, {
    wildcard: true
  });

  var emit = _.bind(this.emit, this);

  function createRoom(name) {
    var room = {
      id: uuid(),
      name: name,
      members: [],
      messages: []
    };

    rooms[room.id] = room;
    emit('room:created', { room: room });
  }

  function getRoom(roomId) {
    var room = rooms[roomId];

    if (room) {
      return _.pick(room, 'name', 'members');
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
    }
  }

  function addRoomMember(roomId, email) {
    var room = rooms[roomId];

    if (room) {
      if (room.members.indexOf(email) === -1) {
        room.members.push(email);
        emit('room:joined', {
          room: room,
          email: email
        });
      }
    }
  }

  function removeRoomMember(roomId, email) {
    var room = rooms[roomId];

    if (room) {
      if (room.members.indexOf(email) !== -1) {
        room.members.push(email);
        emit('room:left', {
          room: room,
          email: email
        });
      }
    }
  }
}

util.inherits(Rooms, EventEmitter2);

module.exports = new Rooms();