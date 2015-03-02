var Marty = require('marty');
var RoomUtils = require('utils/roomUtils');
var RoomHttpAPI = require('sources/roomHttpAPI')
var RoomConstants = require('constants/roomConstants');
var NavigationActionCreators = require('./navigationActionCreators');

var RoomActionCreators = Marty.createActionCreators({
  id: 'RoomActionCreators',
  types: {
    createRoom: RoomConstants.CREATE_ROOM
  },
  createRoom: function (name) {
    var room = RoomUtils.createRoom(name);

    this.dispatch(room);

    RoomHttpAPI.createRoom(room);
  }
});

module.exports = RoomActionCreators;