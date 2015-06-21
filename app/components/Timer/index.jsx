import React from "react";

/*
  Component specific stylesheet
  Can also use .less, .scss, or plain .css files here
*/
require("./style.scss");


export default class Timer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
        <p>Encrypted Data:<br/> <textarea className="form-control" value={this.props.backend.resp.crypted}></textarea></p>
        <p>This has been published on the <a href={`http://4c4b2841.ngrok.com/nxt?requestType=readMessage&transaction=${this.props.backend.resp.transaction}`} target="_blank">NXT Blockchain</a></p>
        <p>Key: {this.props.backend.resp.key}</p>
        <p>Releasing information in {this.props.timer.timeLeft} unless {this.props.timer.amount} is paid into {this.props.timer.account}</p>
    </div>;
  }
}
