/** @jsx React.DOM */

var React = require('react');
var Marty = require('marty');
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

        <ul className="rooms">
          {_.map(this.state.rooms, function (room) {
            return <li className="room">{room.name}</li>;
          }}
        </ul>
      </div>
    );
  }
});

module.exports = Home;