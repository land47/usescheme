import { Scheme } from "../types";

export default function stringToScheme(str: string): Scheme {
  switch (str) {
    case "space_gray":
      return Scheme.DARK;

    case "bright_light":
      return Scheme.LIGHT;

    default:
      return Scheme.LIGHT;
  }
}
