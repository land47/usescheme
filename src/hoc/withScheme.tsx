import React, { Component, ComponentType, } from "react";
import { SchemeContext } from "../contexts";
import { SchemeControls } from "../shared/types";
import { alternativeScheme } from "../utils";

export default function withScheme<P>(Child: ComponentType<P>) {
  return class extends Component<SchemeControls & P, {}> {
    static contextType = SchemeContext;
    static displayName = `withScheme(${Child.displayName || Child.name})`;

    render = () => {
      const { scheme, setScheme } = this.context;

      const controls: SchemeControls = {
        scheme,
        setScheme,
        toggleScheme: () => {
          setScheme(alternativeScheme(scheme))
        }
      }

      return <Child {...this.props} {...controls} />;
    }
  };

}
