import { TIMER_TICK, TIMER_ERROR, TIMER_COMPLETE } from '../constants/ActionTypes';
import { Observable } from 'rx';

const TIMEOUT = 60;

export function startTimer(account, amount) {
  return {
    account,
    amount,
    types: [TIMER_TICK, TIMER_ERROR, TIMER_COMPLETE],
    observable: Observable.timer(1000, 1000).take(TIMEOUT)
  };
}
