import type {
  HassEntities,
  HassServices,
  HassConfig,
  HassUser,
  MessageBase,
} from 'home-assistant-js-websocket';

export interface HomeAssistant {
  auth: any;
  connection: any;
  connected: boolean;
  states: HassEntities;
  services: HassServices;
  config: HassConfig;
  themes: any;
  selectedTheme?: any;
  panels: any;
  panelUrl: string;
  language: string;
  selectedLanguage: string | null;
  locale: any;
  resources: any;
  localize: any;
  translationMetadata: any;
  suspendWhenHidden: boolean;
  enableShortcuts: boolean;
  user: HassUser;
  callService: (
    domain: string,
    service: string,
    serviceData?: any,
    target?: any
  ) => Promise<any>;
  callApi: (method: string, path: string, parameters?: any) => Promise<any>;
  fetchWithAuth: (path: string, options?: any) => Promise<any>;
  sendWS: (msg: MessageBase) => void;
  callWS: <T>(msg: MessageBase) => Promise<T>;
}
