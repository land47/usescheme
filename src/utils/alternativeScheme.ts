import { Scheme } from "../shared/types";

export default function alternativeScheme(scheme: Scheme): Scheme {
  return scheme === Scheme.DARK ? Scheme.LIGHT : Scheme.DARK;
}
