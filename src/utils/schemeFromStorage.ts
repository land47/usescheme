import { storage } from "@unexp/vkstorage";
import { delay } from "../utils";

/**
 * Возвращает сохранённую в `VKStorage` тему.
 */
export default async function schemeFromStorage() {
  /**
   * Фикс бага. Почему так – не ясно. Почему фиксит – тоже не ясно.
   */
  await delay(0);
  return storage.get("scheme").then(({ keys }) => keys[0].value);
}
