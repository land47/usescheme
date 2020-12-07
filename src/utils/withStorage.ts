import { stringToScheme, throttle } from "../utils";
import { Scheme } from "../shared/types";
import { storage } from "@unexp/vkstorage";

/**
 * Используется для вызова `setScheme` с записыванием темы в стор.
 * */
const withStorage = <T, A extends [T], R>(func: (...args: A) => R) => {
  const setSchemeToStorage = throttle(
    (scheme: Scheme) => storage.set("scheme", scheme),
    500
  );

  return (...args: A) => {
    const [scheme] = args;

    if (typeof scheme === "string") {
      func(...args);
      setSchemeToStorage(stringToScheme(scheme));
    }
  };
};

export default withStorage;
