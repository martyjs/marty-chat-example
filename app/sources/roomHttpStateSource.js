var Marty = require('marty');
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
  }
});

module.exports = RoomHttpStateSource;