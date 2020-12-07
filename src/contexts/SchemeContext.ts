import { createContext } from "react";
import { Scheme } from "../shared/types";

export default createContext(
  { scheme: Scheme.LIGHT, setScheme(scheme: Scheme) {/** Initial value */} },
);
