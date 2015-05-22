var React = require('react');
var Marty = require('marty');

var NewRoom = React.createClass({
  contextTypes: Marty.contextTypes,
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
    e.stopPropagation();
    e.preventDefault();

    if (this.state.name.trim() !== "") {
      this.roomActionCreators.createRoom(this.state.name);
      this.setState({
        name: ''
      });
    }
  }
});

module.exports = Marty.createContainer(NewRoom, {
  inject: 'roomActionCreators'
});