var Marty = require('marty');
var MessagesStore = require('stores/messagesStore');
var SocketStateSource = require('marty-socket.io-state-source');
var RoomSourceActionCreators = require('actions/roomSourceActionCreators');
var MessageSourceActionCreators = require('actions/messageSourceActionCreators');

var ServerUpdatesSocket = Marty.createStateSource({
  mixins: [SocketStateSource()],
  events: {
    'message': 'onMessage',
    'room:created': 'onRoomCreated'
  },
  onMessage: function (message) {
    if (!MessagesStore.getMessage(message.id, message.roomId)) {
      MessageSourceActionCreators.addMessage(message);
    }
  },
  onRoomCreated: function (room) {
    RoomSourceActionCreators.addRoom(room);
  }
});

module.exports = ServerUpdatesSocket;