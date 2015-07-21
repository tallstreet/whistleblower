import {
  POST_REQUEST,
  POST_SUCCESS,
  POST_FAILURE,
  CHECK_REQUEST,
  CHECK_SUCCESS,
  CHECK_FAILURE
} from '../constants/ActionTypes';
import { api } from '../utils/webapi';

export function post(data, amount, account) {
  return {
    account,
    amount,
    types: [POST_REQUEST, POST_SUCCESS, POST_FAILURE],
    promise: api('http://localhost:5000/api/v1/add', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data,
        amount,
        account,
      }),
    }),
  };
}

export function check(account) {
  return {
    types: [CHECK_REQUEST, CHECK_SUCCESS, CHECK_FAILURE],
    promise: api(`http://4c4b2841.ngrok.com/nxt?requestType=getBalance&account=${account}`),
  };
}
