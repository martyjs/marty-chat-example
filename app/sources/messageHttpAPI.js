var Marty = require('marty');
var _ = require('underscore');
var format = require('util').format;
var MessageSourceActionCreators = require('../actions/messageSourceActionCreators');

var MessageHttpAPI = Marty.createStateSource({
  type: 'http',
  id: 'MessageHttpAPI',
  getMessagesForRoom: function (roomId) {
    return this.get(format('/api/rooms/%s/messages', roomId)).then((function (res) {
      return MessageSourceActionCreators.for(this).addMessages(roomId, res.body);
    }).bind(this));
  },
  createMessage: function (message) {
    var req = {
      body: _.omit(message, 'cid'),
      url: format('/api/rooms/%s/messages', message.roomId)
    };

    this.post(req).then((function (res) {
      MessageSourceActionCreators.for(this).updateMessage(message.cid, res.body);
    }).bind(this));
  }
});

module.exports = MessageHttpAPI;