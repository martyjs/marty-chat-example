var Marty = require('marty');
var _ = require('lodash');
var format = require('util').format;

var MessageHttpAPI = Marty.createStateSource({
  type: 'http',
  id: 'MessageHttpAPI',
  getMessagesForRoom: function (roomId) {
    return this.get(format('/api/rooms/%s/messages', roomId));
  },
  createMessage: function (message) {
    return this.post({
      body: _.omit(message, 'cid'),
      url: format('/api/rooms/%s/messages', message.roomId)
    });
  }
});

module.exports = MessageHttpAPI;