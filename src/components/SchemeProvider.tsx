import { FC, useEffect, useState } from "react";
import { SchemeContext } from "../contexts";
import { ConfigProviderProps, Scheme } from "../types";
import { appearanceByScheme, stringToScheme } from "../utils";
import bridge, { VKBridgeSubscribeHandler } from "@vkontakte/vk-bridge";
import { ConfigProvider } from "@vkontakte/vkui";

const SchemeProvider: FC<Partial<ConfigProviderProps>> = ({
  children,
  ...props
}) => {
  const [scheme, setScheme] = useState<Scheme | null>(null);

  /**
   * Ловим тему в событии `VKWebAppUpdateConfig`
   * */
  useEffect(() => {
    const themeCatcher: VKBridgeSubscribeHandler = ({ detail }) => {
      if (detail.type !== "VKWebAppUpdateConfig") {
        return;
      }

      setScheme(stringToScheme(detail.data.scheme));
    };

    bridge.subscribe(themeCatcher);
    return () => bridge.unsubscribe(themeCatcher);
  }, []);

  if (scheme === null) {
    return null;
  }

  return (
    <SchemeContext.Provider value={{ scheme, setScheme }}>
      <ConfigProvider
        scheme={scheme}
        appearance={appearanceByScheme(scheme)}
        {...props}
      >
        {children}
      </ConfigProvider>
    </SchemeContext.Provider>
  );
};

export default SchemeProvider;
