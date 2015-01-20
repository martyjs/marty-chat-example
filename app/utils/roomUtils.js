var uuid = require('uuid').v1;
var _ = require('underscore');

module.exports = {
  createRoom: function (name) {
    return {
      id: uuid(),
      name: name,
      messages: [],
      cid: this.cid()
    };
  },
  cid: function () {
    return _.uniqueId('room');
  }
};