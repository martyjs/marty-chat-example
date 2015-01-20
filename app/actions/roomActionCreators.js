var Marty = require('marty');
var RoomUtils = require('utils/roomUtils');
var RoomHttpAPI = require('sources/roomHttpAPI')
var RoomConstants = require('constants/roomConstants');
var NavigationActionCreators = require('./navigationActionCreators');

var RoomActionCreators = Marty.createActionCreators({
  createRoom: RoomConstants.CREATE_ROOM(function (name) {
    var room = RoomUtils.createRoom(name);

    this.dispatch(room);

    return RoomHttpAPI.createRoom(room);
  })
});

module.exports = RoomActionCreators;