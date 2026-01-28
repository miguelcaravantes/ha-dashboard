import { createRoot, type Root } from 'react-dom/client';
import App from './App.jsx';
import { HassProvider, hassStore } from './common/HassProvider.js';
import type { HomeAssistant } from './types/home-assistant.js';

class ReactWrapper extends HTMLElement {
  private root: Root | undefined;

  set hass(value: HomeAssistant) {
    hassStore.setState(value);
  }

  disconnectedCallback() {
    this.root?.unmount();
  }

  connectedCallback() {
    this.root = createRoot(this);
    this.root.render(
      <HassProvider>
        <App />
      </HassProvider>
    );
  }
}

if (!customElements.get('react-panel')) {
  customElements.define('react-panel', ReactWrapper);
}
