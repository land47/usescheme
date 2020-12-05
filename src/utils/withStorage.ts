import { stringToScheme, throttle } from "../utils";
import { Scheme } from "../types";
import { storage } from "@_themis/vkstorage";

const withStorage = <T, A extends [T], R>(func: (...args: A) => R) => {
  function setSchemeToStorage(scheme: Scheme) {
    storage.set("scheme", scheme);
  }

  const throttled = throttle(setSchemeToStorage, 900);

  return (...args: A) => {
    const [scheme] = args;

    if (typeof scheme === "string") {
      throttled(stringToScheme(scheme));
      func(...args);
    }
  };
};

export default withStorage;
