var Marty = require('marty');
var RoomConstants = require('constants/roomConstants');

var RoomSourceActionCreators = Marty.createActionCreators({
  id: 'RoomSourceActionCreators',
  types: {
    addRoom: RoomConstants.ADD_ROOM,
    addRooms: RoomConstants.ADD_ROOMS,
    updateRoom: RoomConstants.UPDATE_ROOM
  }
});

module.exports = RoomSourceActionCreators;