/** @jsx React.DOM */

var React = require('react');
var _ = require('underscore');
var MessageActionCreators = require('actions/messageActionCreators');

var NewMessage = React.createClass({
  render: function () {
    return (
      <div className='new-message'>
        <input type='text'
               value={this.state.text}
               onChange={this.updateText}/>
        <button onClick={this.sendMessage}>Send</button>
      </div>
    );
  },
  getInitialState: function () {
    return {
      text: ''
    };
  },
  updateText: function (e) {
    this.setState({
      text: e.currentTarget.value
    });
  },
  sendMessage: function () {
    MessageActionCreators.sendMessage(
      this.state.text,
      this.props.roomId
    );
    this.setState(this.getInitialState());
  }
});

module.exports = NewMessage;