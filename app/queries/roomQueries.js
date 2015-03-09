var _ = require('lodash');
var Marty = require('marty');
var format = require('util').format;
var RoomsAPI = require('../sources/roomsAPI');
var RoomConstants = require('../constants/roomConstants');

var RoomQueries = Marty.createQueries({
  id: 'RoomQueries',
  getAllRooms: function () {
    return RoomsAPI.for(this).getAllRooms().then((function (res) {
      return this.dispatch(RoomConstants.RECIEVE_ROOMS, res.body);
    }).bind(this));
  },
  getRoom: function (id) {
    return RoomsAPI.for(this).getRoom(id).then((function (res) {
      this.dispatch(RoomConstants.RECIEVE_ROOMS, res.body);
    }).bind(this));
  },
});

module.exports = RoomQueries;