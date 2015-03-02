var Marty = require('marty');
var MessageUtils = require('utils/messageUtils');
var MessageHttpAPI = require('sources/messageHttpAPI')
var MessageConstants = require('constants/messageConstants');
var NavigationActionCreators = require('./navigationActionCreators');

var MessageActionCreators = Marty.createActionCreators({
  id: 'MessageActionCreators',
  types: {
    sendMessage: MessageConstants.ADD_MESSAGE
  },
  sendMessage: function (text, roomId) {
    var message = MessageUtils.createMessage(text, roomId);

    this.dispatch(message);

    MessageHttpAPI.createMessage(message);
  }
});

module.exports = MessageActionCreators;
