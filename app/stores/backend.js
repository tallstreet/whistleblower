import {
  POST_REQUEST,
  POST_SUCCESS,
  POST_FAILURE,
  CHECK_REQUEST,
  CHECK_SUCCESS,
  CHECK_FAILURE,
  TIMER_COMPLETE
} from '../constants/ActionTypes';
//import { redux } from '../client';
//import { startTimer } from '../actions/TimerActions';
//import { check } from '../actions/BackendActions';

const initialState = {
};

export default function backend(state = initialState, action) {
  switch (action.type) {
  case POST_REQUEST:
    return {
      ...state,
      loading: true
    };
  case POST_SUCCESS:
    //redux.dispatch(startTimer(action.account, action.amount));
    return {
      ...state,
      loading: false,
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
  case TIMER_COMPLETE:
    //redux.dispatch(check(action.account));
    return state;
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
