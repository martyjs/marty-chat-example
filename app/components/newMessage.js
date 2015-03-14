var React = require('react');
var _ = require('lodash');
var MessageActionCreators = require('../actions/messageActionCreators');

var NewMessage = React.createClass({
  render: function () {
    return (
      <div className='new-message'>
        <textarea
          rows="3"
          value={this.state.text}
          className="form-control"
          onKeyDown={this.onKeyDown}
          onChange={this.updateText}/>
        <button className='btn btn-primary' onClick={this.sendMessage}>Send</button>
      </div>
    );
  },
  getInitialState: function () {
    return {
      text: ''
    };
  },
  onKeyDown: function (e) {
    if (e.keyCode === 13) {
      this.sendMessage();
    }
  },
  updateText: function (e) {
    this.setState({
      text: e.currentTarget.value
    });
  },
  sendMessage: function () {
    MessageActionCreators.for(this).sendMessage(
      this.state.text,
      this.props.roomId
    );
    this.setState(this.getInitialState());
    return false;
  }
});

module.exports = NewMessage;