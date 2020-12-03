import { storage } from "@_themis/vkstorage";
import { delay } from "../utils";

export default async function schemeFromStorage() {
  /**
   * Фикс бага.
   * При запросе к VKStorage без задержки data равен объекту {result: true}.
   * Почему так – не ясно. Почему фиксит – тоже не ясно.
   */
  await delay(0);
  return storage.get("scheme").then(({ keys }) => keys[0].value);
}
