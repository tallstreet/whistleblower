import { TIMER_TICK } from '../constants/ActionTypes';

const initialState = {
  timeLeft: 60
};

export default function backend(state = initialState, action) {
  switch (action.type) {
  case TIMER_TICK:
    return {
      ...state,
      timeLeft: state.timeLeft - 1
    };
  default:
    return state;
  }
}
