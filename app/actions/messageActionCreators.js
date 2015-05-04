var Marty = require('marty');
var MessageUtils = require('../utils/messageUtils');
var MessageConstants = require('../constants/messageConstants');

var MessageActionCreators = Marty.createActionCreators({
  id: 'MessageActionCreators',
  sendMessage: function (text, roomId) {
    var message = MessageUtils.createMessage(text, roomId);

    this.dispatch(MessageConstants.RECIEVE_MESSAGES, roomId, message);

    this.app.messagesAPI.createMessage(message).then(function (res) {
      this.dispatch(MessageConstants.UPDATE_MESSAGE, message.cid, res.body);
    }.bind(this))
  },
  recieveMessages: function (roomId, messages) {
    this.dispatch(MessageConstants.RECIEVE_MESSAGES, roomId, messages);
  }
});

module.exports = MessageActionCreators;
