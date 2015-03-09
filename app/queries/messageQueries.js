var _ = require('lodash');
var Marty = require('marty');
var format = require('util').format;
var MessagesAPI = require('../sources/messagesAPI');
var MessageConstants = require('../constants/messageConstants');

var MessageQueries = Marty.createQueries({
  id: 'MessageQueries',
  getMessagesForRoom: function (roomId) {
    return MessagesAPI.for(this).getMessagesForRoom(roomId).then((function (res) {
      this.dispatch(MessageConstants.RECIEVE_MESSAGES, roomId, res.body);
    }).bind(this));
  }
});

module.exports = MessageQueries;