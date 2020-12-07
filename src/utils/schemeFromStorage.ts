import { storage } from "@unexp/vkstorage";

/**
 * Возвращает сохранённую в `VKStorage` тему.
 */
export default async function schemeFromStorage() {
  return storage.get("scheme").then(({ keys }) => keys[0].value);
}
