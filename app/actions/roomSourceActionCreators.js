var Marty = require('marty');
var RoomConstants = require('constants/roomConstants');

var RoomSourceActionCreators = Marty.createActionCreators({
  addRoom: RoomConstants.ADD_ROOM(),
  addRooms: RoomConstants.ADD_ROOMS()
});

module.exports = RoomSourceActionCreators;