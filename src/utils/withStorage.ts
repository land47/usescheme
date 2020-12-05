import { stringToScheme, throttle } from "../utils";
import { Scheme } from "../types";
import { storage } from "@unexp/vkstorage";

/**
 * Используется для вызова `setScheme` с записыванием темы в стор.
 * */
const withStorage = <T, A extends [T], R>(func: (...args: A) => R) => {
  function setSchemeToStorage(scheme: Scheme) {
    storage.set("scheme", scheme);
  }

  const throttled = throttle(setSchemeToStorage, 500);

  return (...args: A) => {
    const [scheme] = args;

    if (typeof scheme === "string") {
      func(...args);
      throttled(stringToScheme(scheme));
    }
  };
};

export default withStorage;
