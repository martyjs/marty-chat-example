/** @jsx React.DOM */

var React = require('react');
var Marty = require('marty');
var _ = require('underscore');
var NewMessage = require('./newMessage');
var RoomsStore = require('stores/roomsStore');
var MessagesStore = require('stores/messagesStore');

var RoomState = Marty.createStateMixin({
  listenTo: [RoomsStore, MessagesStore],
  getState: function () {
    return {
      room: RoomsStore.getRoom(this.props.id),
      messages: MessagesStore.getMessagesForRoom(this.props.id)
    };
  }
});

var Room = React.createClass({
  mixins: [RoomState],
  render: function () {
    var renderMessages = this.renderMessages;
    var body = this.state.room.when({
      pending: function () {
        return <div className='loading'>Loading...</div>;
      },
      failed: function (error) {
        return <div className='error'>Failed to load room. {error.message}</div>;
      },
      done: function (room) {
        return (
          <div className='room-body'>
            <h1 className='room-name'>{room.name}</h1>
            {renderMessages()}
            <NewMessage roomId={room.id} />
          </div>
        );
      }
    });

    return <div className='room'>{body}</div>;
  },
  renderMessages: function () {
    return this.state.messages.when({
      pending: function () {
        return <div className='messages-loading'>Loading messages...</div>
      },
      failed: function (error) {
        return <div className='messages-error'>Failed to load messages. {error.message}</div>
      },
      done: function (messages) {
        messages = _.sortBy(messages, function (message) {
          return new Date(message.timestamp);
        });

        return (
          <ul className='messages'>
            {_.map(messages, function (message) {
              return (
                <li className='message'>
                  <div className='message-text'>
                    {message.text}
                  </div>
                </li>
              );
            })}
          </ul>
        );
      }
    });
  }
});

module.exports = Room;