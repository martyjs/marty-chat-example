var React = require('react');
var Marty = require('marty');
var _ = require('lodash');
var NewRoom = require('./newRoom');
var RoomsStore = require('../stores/roomsStore');
var NavigationActionCreators = require('../actions/navigationActionCreators');

var HomeStateMixin = Marty.createStateMixin({
  listenTo: RoomsStore,
  getState: function () {
    return {
      rooms: RoomsStore.for(this).getAll()
    };
  }
});

var Home = React.createClass({
  mixins: [HomeStateMixin],
  render: function () {
    return (
      <div className="home">
        <NewRoom />
        {this.renderRooms()}
      </div>
    );
  },
  renderRooms: function () {
    var navigateToRoom = this.navigateToRoom;

    return this.state.rooms.when({
      pending: function () {
        return <div className='pending'>Loading rooms...</div>;
      },
      failed: function (error) {
        return <div className='error'>Failed to load rooms. {error.message}</div>;
      },
      done: function (rooms) {
        return (
          <ul className="rooms">
            {_.map(rooms, function (room) {
              return (
                <li className='room'>
                  <a href="javascript:void(0)"
                     onClick={_.partial(navigateToRoom, room.id)}>
                     {room.name}
                  </a>
                </li>
              );
            })}
          </ul>
        );
      }
    });
  },
  navigateToRoom: function (roomId) {
    NavigationActionCreators.for(this).navigateToRoom(roomId);
  }
});

module.exports = Home;