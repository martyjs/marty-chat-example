var Marty = require('marty');
var _ = require('underscore');
var RoomSourceActionCreators = require('actions/roomSourceActionCreators');

var RoomHttpStateSource = Marty.createStateSource({
  type: 'http',
  getAllRooms: function () {
    return this.get('/api/rooms').then(function (res) {
      return RoomSourceActionCreators.addRooms(res.body);
    });
  },
  getRoom: function (id) {
    return this.get('/api/rooms/' + id).then(function (res) {
      return RoomSourceActionCreators.addRoom(res.body);
    });
  },
  createRoom: function (room) {
    var req = {
      url: '/api/rooms',
      body: _.omit(room, 'cid')
    };

    return this.post(req).then(function (res) {
      return RoomSourceActionCreators.updateRoom(room.cid, res.body);
    });
  }
});

module.exports = RoomHttpStateSource;