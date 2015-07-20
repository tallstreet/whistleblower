import { POST_SUCCESS, POST_FAILURE, TIMER_COMPLETE } from '../constants/ActionTypes';
import { redux } from '../containers/App';
import { startTimer } from '../actions/TimerActions';
import { check } from '../actions/BackendActions';


export default function backend(state = {}, action) {
  switch (action.type) {
  case POST_SUCCESS:
    redux.dispatch(startTimer(action.account, action.amount));
    return action.result;
  case TIMER_COMPLETE:
    redux.dispatch(check(action.account));
    return state;
  case POST_FAILURE:
    return action.error;
  default:
    return state;
  }
}
