import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as BackendActions from '../../actions/BackendActions';

class Form extends React.Component {
  static propTypes = {
    post: PropTypes.func.isRequired
  };

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="data">Incriminating Data: </label>
          <textarea className="form-control" id="data" placeholder="Put your incriminating data here" value={this.state.data} onChange={this._updateData.bind(this)}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Randsom Amount: </label>
          <input type="number" className="form-control" id="amount" placeholder="10000" onChange={this._updateAmount.bind(this)} value={this.state.amount} />
        </div>
        <div className="form-group">
          <label htmlFor="account">Account to recieve payment: </label>
          <input type="text" className="form-control" id="account" placeholder="NXT-TFRX-DAA9" onChange={this._updateAccount.bind(this)} value={this.state.account} />
        </div>
        <button onClick={this._post.bind(this)} type="submit" className="btn btn-default">Submit</button>
      </form>
    );
  }

  _updateData(evt) {
    this.setState({data: evt.target.value});
  }

  _updateAccount(evt) {
    this.setState({account: evt.target.value});
  }

  _updateAmount(evt) {
    this.setState({amount: evt.target.value});
  }

  _post(e) {
    this.props.post(this.state.data, parseInt(this.state.amount, 10), this.state.account);
    e.preventDefault();
  }

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      account: '',
      amount: 0
    };
  }
}


@connect(state => ({
  error: state.backend.error,
  post: state.backend.post,
  loading: state.backend.loading
}))
export default class FormContainer {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { router } = this.context;
    if (nextProps.post && this.props.post !== nextProps.post) {
      router.transitionTo('/countdown');
    }
  }

  render() {
    const { error, loading, dispatch } = this.props;
    return <Form error={error}
                    loading={loading} {...bindActionCreators(BackendActions, dispatch)} >{this.props.children}</Form>;
  }
}
