var _ = require('lodash');
var Marty = require('marty');

var RoomHttpAPI = Marty.createStateSource({
  type: 'http',
  id: 'RoomHttpAPI',
  getAllRooms: function () {
    return this.get('/api/rooms');
  },
  getRoom: function (id) {
    return this.get('/api/rooms/' + id);
  },
  createRoom: function (room) {
    return this.post({
      url: '/api/rooms',
      body: _.omit(room, 'cid')
    });
  }
});

module.exports = RoomHttpAPI;