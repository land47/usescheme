export default function throttle<T, AT, A extends AT[], R>(
  this: T,
  func: (...args: A) => R,
  ms: number
) {
  let isThrottled = false;
  let savedArgs: A | null = null;
  let savedThis: T | null = null;

  return function wrapper(this: T, ...args: A) {
    if (isThrottled) {
      savedArgs = args;
      return (savedThis = this);
    }

    func.apply(this, args);
    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;

      if (savedArgs !== null && savedThis !== null) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  };
}
