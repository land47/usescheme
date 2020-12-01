import { createContext } from "react";
import { Scheme } from "../types";

export default createContext(
  { scheme: Scheme.LIGHT, setScheme(scheme: Scheme) {/** Initial value */} },
);
