import React, { FC, useEffect, useState } from "react";
import bridge, { VKBridgeSubscribeHandler } from "@vkontakte/vk-bridge";
import { ConfigProvider } from "@vkontakte/vkui";

import { SchemeContext } from "../contexts";
import { ConfigProviderProps, Scheme } from "../types";
import {
  appearanceByScheme,
  colorByScheme,
  schemeFromStorage,
  stringToScheme,
  withStorage,
} from "../utils";
import { IS_IFRAME, IS_WEBVIEW } from "../shared/constants";

const SchemeProvider: FC<Partial<ConfigProviderProps>> = ({
  children,
  ...props
}) => {
  const [scheme, setScheme] = useState<Scheme | null>(null);

  /**
   * Ловим тему в событии `VKWebAppUpdateConfig`
   * */
  useEffect(() => {
    if (!IS_IFRAME && !IS_WEBVIEW) {
      return void schemeFromStorage().then((scheme) =>
        setScheme(stringToScheme(scheme))
      );
    }

    const schemeCatcher: VKBridgeSubscribeHandler = async ({
      detail: { type, data },
    }) => {
      if (type !== "VKWebAppUpdateConfig") {
        return;
      }

      const storageScheme = await schemeFromStorage();

      if (storageScheme) {
        return setScheme(stringToScheme(storageScheme));
      }

      setScheme(stringToScheme(data.scheme));
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

  /**
   * Подстраиваем статус-бар, экшен-бар и бар с навигацией под тему.
   * */
  useEffect(() => {
    if (scheme === null) {
      return;
    }

    const color = colorByScheme(scheme);

    bridge.send("VKWebAppSetViewSettings", {
      status_bar_style: scheme === Scheme.LIGHT ? "dark" : "light",
      action_bar_color: color,
      navigation_bar_color: color,
    });
  }, [scheme]);

  if (scheme === null) {
    return null;
  }

  return (
    <SchemeContext.Provider
      value={{
        scheme,
        setScheme: withStorage(setScheme),
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
