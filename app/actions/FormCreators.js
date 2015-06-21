import { Subject } from "rx";
import actions from "../const/actions";

export var formActions = new Subject();

export function post(data, amount, account) {
  const value = {
    data,
    amount,
    account,
  };

  formActions.onNext({
    type: actions.POST,
    value: value,
  });
}
