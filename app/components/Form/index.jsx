import React from 'react';
import { post } from "../../actions/FormCreators";

/*
  Component specific stylesheet
  Can also use .less, .scss, or plain .css files here
*/
require('./style.scss');


export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        data: '',
        account: '',
        amount: 0,
    };
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

  _post() {
    post(this.state.data, this.state.amount, this.state.account);
    return false;
  }

  render() {
    return <form>
      <div className="form-group">
        <label for="data">Incriminating Data: </label>
        <textarea className="form-control" id="data" placeholder="Put your incriminating data here" value={this.state.data} onChange={this._updateData.bind(this)}></textarea>
      </div>
      <div className="form-group">
        <label for="amount">Randsom Amount: </label>
        <input type="number" className="form-control" id="amount" placeholder="10000" onChange={this._updateAmount.bind(this)} value={this.state.amount} />
      </div>
      <div className="form-group">
        <label for="account">Account to recieve payment: </label>
        <input type="text" className="form-control" id="account" placeholder="NXT-TFRX-DAA9" onChange={this._updateAccount.bind(this)} value={this.state.account} />
      </div>
      <button onClick={this._post.bind(this)} type="submit" className="btn btn-default">Submit</button>
    </form>;
  }
}
