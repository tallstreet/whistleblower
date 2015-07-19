import React from 'react';
import Header from '../Header';
import Form from '../Form';
import Timer from '../Timer';
import { bindActionCreators } from 'redux';
import { connect } from 'redux/react';
import * as FormActions from '../../actions/FormActions';

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

@connect(state => ({
  timer: state.timer,
  backend: state.backend,
}))
export default class Application extends React.Component {
  render() {
    const { timer, backend, dispatch } = this.props;
    const actions = bindActionCreators(FormActions, dispatch);
    let part;
    if (timer.started) {
      part = <Timer timer={timer} backend={backend}/>;
    } else {
      part = <Form post={actions.post}/>;
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
