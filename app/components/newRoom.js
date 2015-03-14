var React = require('react');
var RoomActionCreators = require('../actions/roomActionCreators');

var NewRoom = React.createClass({
  render: function () {
    var name = this.state.name;

    return (
      <form className='new-room form-inline'>
        <div className='form-group'>
          <input
               ref='name'
               name='name'
               type='text'
               value={name}
               placeholder='Room name'
               className='form-control'
               onKeyDown={this.onKeyDown}
               onChange={this.updateRoomName} />
        </div>
        <button className='btn btn-default' ref='createRoom' onClick={this.createRoom}>
          Create room
        </button>
      </form>
    );
  },
  getInitialState: function () {
    return {
      name: ''
    }
  },
  onKeyDown: function (e) {
    if (e.keyCode === 13) {
      this.createRoom();
    }
  },
  updateRoomName: function (e) {
    this.setState({
      name: e.currentTarget.value
    });
  },
  createRoom: function () {
    if (this.state.name.trim() === "") {
      return false;
    }

    RoomActionCreators.for(this).createRoom(this.state.name);
    this.setState(this.getInitialState());
    return false;
  }
});

module.exports = NewRoom;