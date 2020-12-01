import { AppearanceType } from "@vkontakte/vk-bridge";
import { Scheme } from "../types";

export default function appearanceByScheme(scheme: Scheme): AppearanceType {
  return Scheme.DARK ? "dark" : "light";
}
