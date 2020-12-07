export type { ConfigProviderProps } from "@vkontakte/vkui/dist/components/ConfigProvider/ConfigProvider";

export enum Scheme {
  DARK = "space_gray",
  LIGHT = "bright_light",
}

export type SchemeControls = {
  setScheme(scheme: Scheme): void;
  toggleScheme(): void;
  scheme: Scheme;
};
