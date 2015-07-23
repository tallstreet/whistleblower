import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class Timer extends React.Component {
  static propTypes = {
    timeLeft: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    account: PropTypes.number.isRequired,
    crypted: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    transaction: PropTypes.string.isRequired
  };

  render() {
    return (
      <div>
          <p>Encrypted Data:<br/> <textarea className="form-control" value={this.props.crypted}></textarea></p>
          <p>This has been published on the <a href={`http://4c4b2841.ngrok.com/nxt?requestType=readMessage&transaction=${this.props.transaction}`} target="_blank">NXT Blockchain</a></p>
          <p>Key: {this.props.key}</p>
          <p>Releasing information in {this.props.timeLeft} unless {this.props.amount} is paid into {this.props.account}</p>
      </div>
    );
  }
}


@connect(state => ({
  timeLeft: state.timer.timeLeft,
  amount: state.backend.amount,
  account: state.backend.account,
  crypted: state.backend.crypted,
  key: state.backend.account,
  transaction: state.backend.account
}))
export default class TimerContainer {
  static propTypes = {
    timeLeft: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    account: PropTypes.number.isRequired,
    crypted: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    transaction: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.timeLeft <= 0) {
      dispatch(check);
    }
  }

  render() {
    const { timeLeft, amount, account, crypted, key, transaction } = this.props;
    return <Timer
                timeLeft={timeLeft}
                amount={amount}
                account={account}
                crypted={crypted}
                key={key}
                transaction={transaction}>{this.props.children}</Timer>;
  }
}
