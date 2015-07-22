import React, { PropTypes } from 'react';

export default class Form extends React.Component {
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
    this.props.post(this.state.data, this.state.amount, this.state.account);
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
