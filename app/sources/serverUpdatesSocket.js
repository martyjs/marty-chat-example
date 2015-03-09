var Marty = require('marty');
var RoomsStore = require('../stores/roomsStore');
var MessagesStore = require('../stores/messagesStore');
var SocketStateSource = require('marty-socket.io-state-source');
var RoomActionCreators = require('../actions/roomActionCreators');
var MessageActionCreators = require('../actions/messageActionCreators');

var ServerUpdatesSocket = Marty.createStateSource({
  id: 'ServerUpdatesSocket',
  mixins: [SocketStateSource()],
  events: {
    'message': 'onMessage',
    'room:created': 'onRoomCreated'
  },
  onMessage: function (message) {
    if (!MessagesStore.getMessage(message.id, message.roomId)) {
      MessageActionCreators.recieveMessage(message);
    }
  },
  onRoomCreated: function (room) {
    if (!RoomsStore.roomExists(room.id)) {
      RoomActionCreators.recieveRoom(room);
    }
  }
});

module.exports = ServerUpdatesSocket;