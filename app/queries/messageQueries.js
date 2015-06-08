var _ = require('lodash');
var Marty = require('marty');
var format = require('util').format;
var MessageConstants = require('../constants/messageConstants');

var MessageQueries = Marty.createQueries({
  id: 'MessageQueries',
  getMessagesForRoom: function (roomId) {
    return this.app.messagesAPI.getMessagesForRoom(roomId).then((function (res) {
      this.dispatch(MessageConstants.RECEIVE_MESSAGES, roomId, res.body);
    }).bind(this));
  }
});

module.exports = MessageQueries;