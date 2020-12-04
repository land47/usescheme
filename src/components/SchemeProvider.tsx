import React, { FC, useEffect, useState } from "react";
import bridge, { VKBridgeSubscribeHandler } from "@vkontakte/vk-bridge";
import { ConfigProvider } from "@vkontakte/vkui";

import { SchemeContext } from "../contexts";
import { ConfigProviderProps, Scheme } from "../types";
import { appearanceByScheme, schemeFromStorage, stringToScheme, withStorage } from "../utils";
import { IS_IFRAME } from "../shared/constants"

const SchemeProvider: FC<Partial<ConfigProviderProps>> = ({
  children,
  ...props
}) => {
  const [scheme, setScheme] = useState<Scheme | null>(null);

  /**
   * Ловим тему в событии `VKWebAppUpdateConfig`
   * */
  useEffect(() => {
    if (!IS_IFRAME) {
      return void schemeFromStorage().then(scheme =>
        setScheme(stringToScheme(scheme))
      );
    }

    const schemeCatcher: VKBridgeSubscribeHandler = async ({ detail }) => {
      if (detail.type !== "VKWebAppUpdateConfig") {
        return;
      }

      const storageScheme = await schemeFromStorage()

      if (storageScheme) {
        return setScheme(stringToScheme(storageScheme));
      }

      setScheme(stringToScheme(detail.data.scheme));
    };

    bridge.subscribe(schemeCatcher);

    /**
     * После вызова `VKWebAppInit` будут повторно вызваны подписанные `bridge.subscribe()`
     * обработчики. Нужно для того, чтобы если это событие уже было вызвано, но `SchemeProvider`
     * не успел подписать `schemeCatcher`, не происходило бесконечной загрузки приложения
     * (потому что scheme равно null из-за того, что не была "поймана" тема). 
     * 
     * Повторного рендера при этом происходить не будет.
     */
    bridge.send("VKWebAppInit");

    return () => bridge.unsubscribe(schemeCatcher);
  }, []);

  if (scheme === null) {
    return null;
  }

  return (
    <SchemeContext.Provider
      value={{
        scheme,
        setScheme: withStorage(setScheme)
      }}
    >
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
