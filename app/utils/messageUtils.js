var _ = require('underscore');

module.exports = {
  createMessage: function (text, roomId) {
    return {
      text: text,
      roomId: roomId,
      cid: this.cid()
    };
  },
  cid: function () {
    return _.uniqueId('message');
  }
};