import React from "react";
import Header from "../Header";
import Form from "../Form";
import Timer from "../Timer";

/*
  Component specific stylesheet
  Can also use .less, .scss, or plain .css files here
*/
require("./style.scss");

export default class Application extends React.Component {
  render() {
    let part;
    if (this.props.timer.started) {
      part = <Timer timer={this.props.timer} backend={this.props.backend}/>;
    } else {
      part = <Form />;
    }
    return <div className="ApplicationComponent">
      <div className="ApplicationComponent-wrap">
        <Header />

        {part}
      </div>
    </div>;
  }
}


Application.propTypes = {
  backend: React.PropTypes.object,
  timer: React.PropTypes.object,
};
