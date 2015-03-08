var Marty = require('marty');
var _ = require('lodash');
var RoomSourceActionCreators = require('../actions/roomSourceActionCreators');

var RoomHttpAPI = Marty.createStateSource({
  type: 'http',
  id: 'RoomHttpAPI',
  getAllRooms: function () {
    return this.get('/api/rooms').then((function (res) {
      return RoomSourceActionCreators.for(this).addRooms(res.body);
    }).bind(this));
  },
  getRoom: function (id) {
    return this.get('/api/rooms/' + id).then((function (res) {
      return RoomSourceActionCreators.for(this).addRoom(res.body);
    }).bind(this));
  },
  createRoom: function (room) {
    var req = {
      url: '/api/rooms',
      body: _.omit(room, 'cid')
    };

    this.post(req).then((function (res) {
      RoomSourceActionCreators.for(this).updateRoom(room.cid, res.body);
    }).bind(this));
  }
});

module.exports = RoomHttpAPI;