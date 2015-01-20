/** @jsx React.DOM */

var React = require('react');
var Marty = require('marty');
var _ = require('underscore');
var NewRoom = require('./newRoom');
var RoomsStore = require('stores/roomStore');

var HomeStateMixin = Marty.createStateMixin({
  listenTo: RoomsStore,
  getState: function () {
    return {
      rooms: RoomsStore.getAll()
    };
  }
});

var Home = React.createClass({
  mixins: [HomeStateMixin],
  render: function () {
    return (
      <div className="home">
        <h1 ref="title">Rooms</h1>
        <NewRoom />
        {this.renderRooms()}
      </div>
    );
  },
  renderRooms: function () {
    return this.state.rooms.when({
      pending: function () {
        return <div className='pending'>Loading rooms...</div>;
      },
      failed: function (error) {
        return <div className='error'>Failed to load rooms. {error.message}</div>;
      },
      done: function (rooms) {
        console.log(rooms);
        return (
          <ul className="rooms">
            {_.map(rooms, function (room) {
              return <li className='room'>{room.name}</li>
            })}
          </ul>
        );
      }
    });
  }
});

module.exports = Home;