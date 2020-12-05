import bridge from "@vkontakte/vk-bridge";
import { Scheme } from "../types";
import { colorByScheme } from "../utils";
import { IS_WEBVIEW } from "../shared/constants";

export default function updateNativeBars(currentScheme: Scheme) {
  if (!IS_WEBVIEW) {
    return;
  }

  const color = colorByScheme(currentScheme);

  return bridge.send("VKWebAppSetViewSettings", {
    status_bar_style: currentScheme === Scheme.LIGHT ? "dark" : "light",
    action_bar_color: color,
    navigation_bar_color: color,
  });
}
