var React = require('react');
var Marty = require('marty');
var _ = require('lodash');
var NewMessage = require('./newMessage');
var RoomsStore = require('../stores/roomsStore');
var MessagesStore = require('../stores/messagesStore');

var Room = React.createClass({
  render: function () {
    var room = this.props.room;
    var messages = _.sortBy(this.props.messages, function (message) {
      return new Date(message.timestamp);
    });

    return (
      <div className='room'>
        <div className='room-body'>
          <h1 className='room-name'>{room.name}</h1>
          <ul className='messages'>
            {_.map(messages, (message) => {
              return (
                <li className='message'>
                  <div className='message-text'>
                    {message.text}
                  </div>
                </li>
              );
            })}
          </ul>
          <NewMessage roomId={room.id} />
        </div>
      </div>
    );
  }
});

module.exports = Marty.createContainer(Room, {
  listenTo: ['roomsStore', 'messagesStore'],
  fetch: {
    room() {
      return this.app.roomsStore.getRoom(this.props.id)
    },
    messages() {
      return this.app.messagesStore.getMessagesForRoom(this.props.id)
    }
  },
  pending() {
    return <div className='loading'>Loading...</div>;
  },
  failed(errors) {
    return <div className='error'>Failed to load room. {errors}</div>;
  }
});