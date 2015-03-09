var Marty = require('marty');
var RoomUtils = require('../utils/roomUtils');
var RoomsAPI = require('../sources/roomsAPI')
var RoomConstants = require('../constants/roomConstants');
var NavigationActionCreators = require('./navigationActionCreators');

var RoomActionCreators = Marty.createActionCreators({
  id: 'RoomActionCreators',
  createRoom: function (name) {
    var room = RoomUtils.createRoom(name);

    this.dispatch(RoomConstants.RECIEVE_ROOMS, room);

    RoomsAPI.createRoom(room).then(function (res) {
      this.dispatch(RoomConstants.UPDATE_ROOM, room.cid, res.body);
    }.bind(this))
  },
  recieveRooms: function (rooms) {
    this.dispatch(RoomConstants.RECIEVE_ROOMS, rooms);
  }
});

module.exports = RoomActionCreators;