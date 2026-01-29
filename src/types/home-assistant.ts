import type {
  HassEntities,
  HassServices,
  HassConfig,
  HassUser,
  MessageBase,
} from 'home-assistant-js-websocket';

export interface HomeAssistant {
  auth: unknown;
  connection: unknown;
  connected: boolean;
  states: HassEntities;
  services: HassServices;
  config: HassConfig;
  themes: unknown;
  selectedTheme?: unknown;
  panels: unknown;
  panelUrl: string;
  language: string;
  selectedLanguage: string | null;
  locale: unknown;
  resources: unknown;
  localize: (...args: unknown[]) => string;
  translationMetadata: unknown;
  suspendWhenHidden: boolean;
  enableShortcuts: boolean;
  user: HassUser;
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: Record<string, unknown>,
  ) => Promise<unknown>;
  callApi: (
    method: string,
    path: string,
    parameters?: Record<string, unknown>,
  ) => Promise<unknown>;
  fetchWithAuth: (path: string, options?: unknown) => Promise<unknown>;
  sendWS: (msg: MessageBase) => void;
  callWS: <T>(msg: MessageBase) => Promise<T>;
}
