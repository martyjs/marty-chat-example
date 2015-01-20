var _ = require('lodash');
var Marty = require('marty');
var MessageUtils = require('utils/messageUtils');
var MessageHttpAPI = require('sources/messageHttpAPI');
var MessageConstants = require('constants/messageConstants');

var MessagesStore = Marty.createStore({
  displayName: 'rooms',
  handlers: {
    addMessage: MessageConstants.ADD_MESSAGE,
    addMessages: MessageConstants.ADD_MESSAGES,
    updateMessage: MessageConstants.UPDATE_MESSAGE
  },
  getInitialState: function () {
    return {};
  },
  getMessagesForRoom: function (roomId) {
    return this.fetch({
      id: roomId,
      locally: function () {
        return this.state[roomId];
      },
      remotely: function () {
        return MessageHttpAPI.getMessagesForRoom(roomId);
      }
    });
  },
  getMessage: function (messageId, roomId) {
    var messages = this.state[roomId];

    if (messages) {
      return _.findWhere(messages, {
        id: messageId
      });
    }
  },
  updateMessage: function (cid, message) {
    var oldMessage = _.findWhere(this.state[message.roomId], {
      cid: cid
    });

    if (oldMessage) {
      _.extend(oldMessage, message);
      this.hasChanged();
    }
  },
  addMessage: function (message) {
    this.addMessages(message.roomId, [message]);
  },
  addMessages: function (roomId, messages) {
    _.each(messages, function (message) {
      if (!message.cid) {
        message.cid = MessageUtils.cid();
      }
    }, this);

    this.state[roomId] = _.union(messages, this.state[roomId]);
    this.hasChanged();
  }
});

module.exports = MessagesStore;