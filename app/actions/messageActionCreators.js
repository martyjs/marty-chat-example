var Marty = require('marty');
var MessageUtils = require('utils/messageUtils');
var MessageHttpAPI = require('sources/messageHttpAPI')
var MessageConstants = require('constants/messageConstants');
var NavigationActionCreators = require('./navigationActionCreators');

var MessageActionCreators = Marty.createActionCreators({
  sendMessage: MessageConstants.ADD_MESSAGE(function (text, roomId) {
    var message = MessageUtils.createMessage(text, roomId);

    this.dispatch(message);

    return MessageHttpAPI.createMessage(message);
  })
});

module.exports = MessageActionCreators;
