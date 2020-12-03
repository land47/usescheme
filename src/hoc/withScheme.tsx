import { Component, ComponentType, } from "react";
import { SchemeContext } from "../contexts";
import { SchemeControls } from "../types";
import { alternativeScheme } from "../utils";

export default function withScheme<P>(Child: ComponentType<P>) {
  return class extends Component<SchemeControls & P, {}> {
    static contextType = SchemeContext;
    static displayName = `withScheme(${Child.displayName || Child.name})`;

    controls: SchemeControls = {
      scheme: this.context.scheme,
      setScheme: this.context.setScheme,
      toggleScheme: () => {
        this.context.setScheme(alternativeScheme(this.context.scheme))
      }
    }

    render = () => {
      return <Child {...this.props} {...this.controls} />;
    }
  };

}
