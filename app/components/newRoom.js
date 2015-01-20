/** @jsx React.DOM */

var React = require('react');
var RoomActionCreators = require('actions/roomActionCreators');

var NewRoom = React.createClass({
  render: function () {
    var name = this.state.name;

    return (
      <div className='new-room'>
        <input ref='name'
               type='text'
               value={name}
               onChange={this.updateRoomName} />

        <button ref='createRoom' onClick={this.createRoom}>
          Create room
        </button>
      </div>
    );
  },
  getInitialState: function () {
    return {
      name: ''
    }
  },
  updateRoomName: function (e) {
    this.setState({
      name: e.currentTarget.value
    });
  },
  createRoom: function () {
    RoomActionCreators.createRoom(this.state.name);
    this.setState(this.getInitialState());
  }
});

module.exports = NewRoom;