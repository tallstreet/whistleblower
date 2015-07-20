export default function observableMiddleware() {
  return (next) => (action) => {
    const { observable, types, ...rest } = action;
    if (!observable) {
      return next(action);
    }

    const [SUCCESS, FAILURE, COMPLETED] = types;
    return observable.subscribe(
      (result) => next({ ...rest, result, type: SUCCESS }),
      (error) => next({ ...rest, error, type: FAILURE }),
      () => next({ ...rest, type: COMPLETED })
    );
  };
}
