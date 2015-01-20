var _ = require('underscore');

module.exports = {
  createRoom: function (name) {
    return {
      name: name,
      members: [],
      messages: [],
      cid: this.cid()
    };
  },
  cid: function () {
    return _.uniqueId('room');
  }
};