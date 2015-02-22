var Marty = require('marty');
var _ = require('underscore');
var format = require('util').format;
var MessageSourceActionCreators = require('actions/messageSourceActionCreators');

var MessageHttpAPI = Marty.createStateSource({
  type: 'http',
  getMessagesForRoom: function (roomId) {
    return this.get(format('/api/rooms/%s/messages', roomId)).then(function (res) {
      return MessageSourceActionCreators.addMessages(roomId, res.body);
    });
  },
  createMessage: function (message) {
    var req = {
      body: _.omit(message, 'cid'),
      url: format('/api/rooms/%s/messages', message.roomId)
    };

    this.post(req).then(function (res) {
      MessageSourceActionCreators.updateMessage(message.cid, res.body);
    });
  }
});

module.exports = MessageHttpAPI;