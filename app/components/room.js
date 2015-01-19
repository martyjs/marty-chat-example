var React = require('react');
var Marty = require('marty');
var RoomStore = require('stores/roomStore');

var RoomState = Marty.createStateMixin({
  listenTo: [RoomStore],
  getState: function () {
    return {
      room: RoomStore.getById(this.props.id)
    };
  }
});

var Room = React.createClass({
  mixins: [RoomState],
  render: function () {
    return this.state.room.when({
      pending: function () {
        return <div className='loading'>Loading</div>;
      },
      error: function (error) {
        return <div className='error'>{error.message}</div>;
      },
      done: function (room) {
        return <div className='room'>{room}</div>;
      }
    });
  }
});

module.exports = Room;