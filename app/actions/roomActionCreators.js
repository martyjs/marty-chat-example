var Marty = require('marty');
var RoomUtils = require('../utils/roomUtils');
var RoomConstants = require('../constants/roomConstants');

var RoomActionCreators = Marty.createActionCreators({
  id: 'RoomActionCreators',
  createRoom: function (name) {
    var room = RoomUtils.createRoom(name);

    this.dispatch(RoomConstants.RECIEVE_ROOMS, room);

    this.app.roomsAPI.createRoom(room).then(function (res) {
      this.dispatch(RoomConstants.UPDATE_ROOM, room.cid, res.body);
    }.bind(this))
  },
  recieveRooms: function (rooms) {
    this.dispatch(RoomConstants.RECIEVE_ROOMS, rooms);
  }
});

module.exports = RoomActionCreators;