import React, { PropTypes } from 'react';
import Header from '../Header';
import Form from '../Form';
import Timer from '../Timer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as BackendActions from '../../actions/BackendActions';


let bgURL = '';
if (__CLIENT__) {
  bgURL = require('./images/bg.jpg');
}

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
    height: '100%'
  },

  applicationComponentWrap: {
    width: '500px',
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '1em',
    borderRadius: '.3em',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.25)'
  }
};

class Application extends React.Component {
  static propTypes = {
    timer: PropTypes.object.isRequired,
    backend: PropTypes.object.isRequired,
    post: PropTypes.func.isRequired
  };

  render() {
    const { timer, backend, post } = this.props;
    let part;
    if (timer.started) {
      part = <Timer timer={timer} backend={backend}/>;
    } else {
      part = <Form post={post}/>;
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


@connect(state => ({
  timer: state.timer,
  backend: state.backend
}))
export default class ApplicationContainer {
  static propTypes = {
    timer: PropTypes.object,
    backend: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const { timer, backend, dispatch } = this.props;
    return <Application timer={timer} backend={backend} {...bindActionCreators(BackendActions, dispatch)}/>;
  }
}
