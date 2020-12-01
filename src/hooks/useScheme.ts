import { useContext } from "react";
import { SchemeContext } from "../contexts";
import { SchemeControls } from "../types";
import { alternativeScheme } from "../utils";

export default function useScheme(): SchemeControls {
  const { scheme, setScheme } = useContext(SchemeContext);

  return {
    setScheme,
    toggleScheme() {
      setScheme(alternativeScheme(scheme));
    },
    scheme,
  };
}
