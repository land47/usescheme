import { Scheme } from "../shared/types";

export default function colorByScheme(scheme: Scheme) {
  return scheme === Scheme.DARK ? "#19191a" : "#fff";
}
