var _ = require('lodash');
var Marty = require('marty');
var RoomConstants = require('constants/roomConstants');
var RoomHttpStateSource = require('sources/roomHttpStateSource');

var RoomStore = Marty.createStore({
  name: 'rooms',
  handlers: {
    addRoom: RoomConstants.ADD_ROOM,
    addRooms: RoomConstants.ADD_ROOMS
  },
  getInitialState: function () {
    RoomHttpStateSource.getAllRooms();

    return {};
  },
  getAll: function () {
    return _.values(this.state);
  },
  addRoom: function (room) {
    this.addRooms([room]);
  },
  addRooms: function (rooms) {
    _.each(rooms, function (room) {
      this.state[room.id] = room;
    }, this);

    this.hasChanged();
  },
  getRoom: function (id) {
    return this.fetch(id,
      function () {
        return this.state[id];
      },
      function () {
        return RoomHttpStateSource.getRoom(id);
      }
    );
  }
});

module.exports = RoomStore;