import { Component, ComponentType } from "react";
import { SchemeContext } from "../contexts";
import { Scheme, SchemeControls } from "../types";
import { alternativeScheme } from "../utils";

export default function withScheme(Element: ComponentType<SchemeControls>) {
  return class extends Component {
    static contextType = SchemeContext;

    render() {
      const { scheme, setScheme } = this.context;

      const controls: SchemeControls = {
        scheme,
        setScheme: (scheme: Scheme) => {
          setScheme(scheme);
        },
        toggleScheme: () => {
          setScheme(alternativeScheme(scheme));
        },
      };

      return <Element {...controls} />;
    }
  };
}
