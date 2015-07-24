import {
  POST_REQUEST,
  POST_SUCCESS,
  POST_FAILURE,
  CHECK_REQUEST,
  CHECK_SUCCESS,
  CHECK_FAILURE
} from '../constants/ActionTypes';

const initialState = {
};

export default function backend(state = initialState, action) {
  switch (action.type) {
  case POST_REQUEST:
    return {
      ...state,
      amount: action.amount,
      account: action.account,
      loading: true
    };
  case POST_SUCCESS:
    return {
      ...state,
      loading: false,
      crypted: action.result.crypted,
      keyName: action.result.key,
      transaction: action.result.transaction,
      post: action
    };
  case CHECK_REQUEST:
    return {
      ...state,
      loading: true
    };
  case CHECK_SUCCESS:
    return {
      ...state,
      loading: false,
      check: action.result
    };
  case CHECK_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.error
    };
  case POST_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.error
    };
  default:
    return state;
  }
}
