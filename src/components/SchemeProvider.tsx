import React, { FC, useCallback, useEffect, useState } from "react";
import bridge, {
  UpdateConfigData,
  VKBridgeSubscribeHandler,
} from "@vkontakte/vk-bridge";
import { ConfigProvider } from "@vkontakte/vkui";

import { SchemeContext } from "../contexts";
import { ConfigProviderProps, Scheme } from "../shared/types";
import {
  appearanceByScheme,
  schemeFromStorage,
  stringToScheme,
  withStorage,
  updateNativeBars,
  throttle,
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
      detail: { data, type },
    }) => {
      if (type !== "VKWebAppUpdateConfig") {
        return;
      }

      const storageScheme = await schemeFromStorage();

      if (storageScheme) {
        return setScheme(stringToScheme(storageScheme));
      }

      const updateConfigData = data as UpdateConfigData;
      setScheme(stringToScheme(updateConfigData.scheme));
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

  const throttledUpdateNativeBars = useCallback(
    throttle(updateNativeBars, 1000),
    []
  );

  /**
   * Подстраиваем статус и экшен-бар под тему.
   * */
  useEffect(() => {
    if (scheme === null) {
      return;
    }

    throttledUpdateNativeBars(scheme);
  }, [scheme]);

  const setSchemeWithStorage = useCallback(withStorage(setScheme), []);

  if (scheme === null) {
    return null;
  }

  return (
    <SchemeContext.Provider
      value={{
        scheme,
        setScheme: setSchemeWithStorage,
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
