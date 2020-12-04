import { Scheme } from "../types";

/**
 * Приводит строку к `Scheme` типа.
 * Полезно для приведения некорректной (или неизвестно, коректна ли она) строки,
 * также может действовать как Type Guard.
 */
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
