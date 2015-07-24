import { TIMER_TICK } from '../constants/ActionTypes';

const initialState = {
  timeLeft: 59,
  started: false
};

export default function timer(state = initialState, action) {
  switch (action.type) {
  case TIMER_TICK:
    return {
      ...state,
      started: true,
      timeLeft: state.timeLeft - 1
    };
  default:
    return state;
  }
}

export function isLoaded(globalState) {
  return globalState.timer && globalState.timer.started;
}
