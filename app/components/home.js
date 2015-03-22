var _ = require('lodash');
var React = require('react');
var Marty = require('marty');
var NewRoom = require('./newRoom');
var RoomsStore = require('../stores/roomsStore');
var NavigationActionCreators = require('../actions/navigationActionCreators');

var Home = React.createClass({
  render() {
    return (
      <div className="home">
        <NewRoom />
        <ul className="rooms">
          {_.map(this.props.rooms, (room) => {
            return (
              <li className='room'>
                <a href="javascript:void(0)"
                   onClick={_.partial(this.navigateToRoom, room.id)}>
                   {room.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
  navigateToRoom(roomId) {
    NavigationActionCreators.for(this).navigateToRoom(roomId);
  }
});

module.exports = Marty.createContainer(Home, {
  listenTo: RoomsStore,
  fetch: {
    rooms() {
      return RoomsStore.for(this).getAll();
    }
  },
  pending() {
    return <div className='pending'>Loading rooms...</div>;
  },
  failed(errors) {
    return <div className='error'>Failed to load rooms. {errors}</div>;
  }
});