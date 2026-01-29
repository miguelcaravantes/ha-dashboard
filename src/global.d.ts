import type { HomeAssistant } from './types/home-assistant';

declare global {
  interface HomeAssistantElement extends HTMLElement {
    hass: HomeAssistant;
    shadowRoot: ShadowRoot;
  }

  interface CustomPanelElement extends HTMLElement {
    parentNode: HomeAssistantElement & {
      parentNode: HTMLElement & {
        offsetParent: HTMLElement;
      };
    };
  }

  interface Window {
    customPanel?: CustomPanelElement;
  }
}

export {};
