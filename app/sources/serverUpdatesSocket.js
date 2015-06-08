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
    if (!this.app.messagesStore.getMessage(message.id, message.roomId)) {
      this.app.messageActionCreators.receiveMessages(message.roomId, [message]);
    }
  },
  onRoomCreated: function (room) {
    if (!this.app.roomsStore.roomExists(room.id)) {
      this.app.roomActionCreators.receiveRooms([room]);
    }
  }
});

module.exports = ServerUpdatesSocket;