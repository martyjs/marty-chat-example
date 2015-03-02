var _ = require('lodash');
var Marty = require('marty');
var RoomUtils = require('utils/roomUtils');
var RoomHttpAPI = require('sources/roomHttpAPI');
var RoomConstants = require('constants/roomConstants');

var RoomStore = Marty.createStore({
  id: 'Rooms',
  handlers: {
    addRooms: RoomConstants.ADD_ROOMS,
    updateRoom: RoomConstants.UPDATE_ROOM,
    addRoom: [RoomConstants.ADD_ROOM, RoomConstants.CREATE_ROOM]
  },
  getInitialState: function () {
    return {};
  },
  getAll: function () {
    return this.fetch({
      id: 'all-rooms',
      locally: function () {
        if (this.hasAlreadyFetched('all-rooms')) {
          return _.values(this.state);
        }
      },
      remotely: function () {
        return RoomHttpAPI.getAllRooms();
      }
    });
  },
  getRoom: function (id) {
    return this.fetch({
      id: id,
      dependsOn: this.getAll(),
      locally: function () {
        return _.findWhere(_.values(this.state), {
          id: id
        }) || null;
      }
    });
  },
  roomExists: function (id) {
    return _.findWhere(_.values(this.state), {
      id: id
    });
  },
  updateRoom: function (cid, room) {
    this.state[cid] = _.extend(room, this.state[cid]);
    this.hasChanged();
  },
  addRoom: function (room) {
    this.addRooms([room]);
  },
  addRooms: function (rooms) {
    _.each(rooms, function (room) {
      if (!room.cid) {
        room.cid = RoomUtils.cid();
      }

      this.state[room.cid] = room;
    }, this);

    this.hasChanged();
  }
});

module.exports = RoomStore;