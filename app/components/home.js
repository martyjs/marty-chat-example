var _ = require('lodash');
var React = require('react');
var Marty = require('marty');
var NewRoom = require('./newRoom');

var Home = React.createClass({
  contextTypes: Marty.contextTypes,
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
    this.context.app.navigationActionCreators.navigateToRoom(roomId);
  }
});

module.exports = Marty.createContainer(Home, {
  listenTo: 'roomsStore',
  fetch: {
    rooms() {
      return this.app.roomsStore.getAll();
    }
  },
  pending() {
    return <div className='pending'>Loading rooms...</div>;
  },
  failed(errors) {
    return <div className='error'>Failed to load rooms. {errors}</div>;
  }
});