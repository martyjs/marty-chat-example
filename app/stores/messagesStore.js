var _ = require('lodash');
var Marty = require('marty');
var MessageUtils = require('../utils/messageUtils');
var MessageQueries = require('../queries/messageQueries');
var MessageConstants = require('../constants/messageConstants');

var MessagesStore = Marty.createStore({
  id: 'Messages',
  handlers: {
    addMessages: MessageConstants.RECIEVE_MESSAGES,
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
        return this.app.messageQueries.getMessagesForRoom(roomId);
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
  addMessages: function (roomId, messages) {
    if (!_.isArray(messages)) {
      messages = [messages];
    }

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