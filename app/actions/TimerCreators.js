import { Subject } from "rx";
import actions from "../const/actions";

export var timerActions = new Subject();

export function startTimer(account, amount) {
  const value = {
    account,
    amount,
  };

  timerActions.onNext({
    type: actions.START_TIMER,
    value: value,
  });
}
