var _ = require('lodash');
var Marty = require('marty');
var RoomUtils = require('../utils/roomUtils');
var RoomQueries = require('../queries/roomQueries');
var RoomConstants = require('../constants/roomConstants');

var RoomStore = Marty.createStore({
  id: 'Rooms',
  handlers: {
    updateRoom: RoomConstants.UPDATE_ROOM,
    addRooms: RoomConstants.RECIEVE_ROOMS
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
        return this.app.roomQueries.getAllRooms();
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
    if (!_.isArray(rooms)) {
      rooms = [rooms];
    }

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