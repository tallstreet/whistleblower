import { POST_REQUEST, POST_SUCCESS, POST_FAILURE } from '../constants/ActionTypes';
import { api } from '../utils/webapi';

export function post(data, amount, account) {
  return {
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
