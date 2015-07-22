import React, { PropTypes } from 'react';

export default class Timer extends React.Component {
  static propTypes = {
    timer: PropTypes.object.isRequired,
    backend: PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
          <p>Encrypted Data:<br/> <textarea className="form-control" value={this.props.backend.resp.crypted}></textarea></p>
          <p>This has been published on the <a href={`http://4c4b2841.ngrok.com/nxt?requestType=readMessage&transaction=${this.props.backend.resp.transaction}`} target="_blank">NXT Blockchain</a></p>
          <p>Key: {this.props.backend.resp.key}</p>
          <p>Releasing information in {this.props.timer.timeLeft} unless {this.props.timer.amount} is paid into {this.props.timer.account}</p>
      </div>
    );
  }
}
