import { FC, useEffect, useState } from "react"
import { SchemeContext } from "../contexts";
import { Scheme } from "../types";
import { appearanceByScheme, stringToScheme } from "../utils"
import bridge, { VKBridgeSubscribeHandler } from "@vkontakte/vk-bridge";
import { ConfigProvider } from "@vkontakte/vkui"

export type SchemeProviderProps = {
    initial: Scheme;
}

const SchemeProvider: FC<SchemeProviderProps> = ({ initial, children }) => {
    const [scheme, setScheme] = useState<Scheme>(initial)

    useEffect(() => {
        const themeCatcher: VKBridgeSubscribeHandler = ({ detail }) => {
            if (detail.type !== "VKWebAppUpdateConfig") {
                return;
            }

            setScheme(stringToScheme(detail.data.scheme));
        }

        bridge.subscribe(themeCatcher);
        return () => bridge.unsubscribe(themeCatcher);
    }, [])

    return (
        <SchemeContext.Provider value={{ scheme, setScheme }}>
            <ConfigProvider scheme={scheme} appearance={appearanceByScheme(scheme)}>
                {children}
            </ConfigProvider>
        </SchemeContext.Provider>
    );
}

export default SchemeProvider;