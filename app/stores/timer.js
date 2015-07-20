import { TIMER_TICK } from '../constants/ActionTypes';

export default function backend(state = 60, action) {
  switch (action.type) {
  case TIMER_TICK:
    return state - 1;
  default:
    return state;
  }
}
