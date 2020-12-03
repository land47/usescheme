import { storage } from "@_themis/vkstorage";

export default function withStorage<T, A extends T[], R>(
  func: (...args: A) => R,
) {
  return (...args: A) => {
    func(...args);

    if (typeof args[0] === "string") {
      storage.set("scheme", args[0] + "");
    }
  };
}
