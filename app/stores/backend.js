import { POST_SUCCESS, POST_FAILURE } from '../constants/ActionTypes';
import { dispatch } from 'redux';
import { startTimer } from '../actions/TimerActions';

export default function backend(state = {}, action) {
  switch (action.type) {
  case POST_SUCCESS:
    dispatch(startTimer);
    return action.data;
  case POST_FAILURE:
    return action.error;
  default:
    return state;
  }
  return state;
}
