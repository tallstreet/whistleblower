import React from 'react';
import Header from '../Header';
import Form from '../Form';
import Timer from '../Timer';

const bgURL = require('./images/bg.jpg');
const styles = {
  applicationComponent: {
    backgroundImage: 'url(' + bgURL + ')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    fontFamily: 'Helvetica Neue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  applicationComponentWrap: {
    width: '500px',
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '1em',
    borderRadius: '.3em',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.25)',
  },
};
export default class Application extends React.Component {
  render() {
    let part;
    if (this.props.timer.started) {
      part = <Timer timer={this.props.timer} backend={this.props.backend}/>;
    } else {
      part = <Form />;
    }
    return (
      <div style={styles.applicationComponent}>
        <div style={styles.applicationComponentWrap}>
          <Header />

          {part}
        </div>
      </div>
    );
  }
}


Application.propTypes = {
  backend: React.PropTypes.object,
  timer: React.PropTypes.object,
};
