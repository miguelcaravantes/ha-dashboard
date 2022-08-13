import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

function createStore(initalState = {}) {
  let state = initalState;
  const listeners = new Set();

  function setState(newState) {
    state = newState;
    listeners.forEach((notify) => notify());
  }

  function subscribe(listener) {
    listeners.add(listener);
    () => listeners.delete(listener);
  }
  function getSnapshot() {
    return state;
  }
  function getServerSnapshot() {
    return state;
  }

  return { setState, subscribe, getSnapshot, getServerSnapshot };
}

export const hassStore = createStore({});

class ReactWrapper extends HTMLElement {
  set hass(value) {
    hassStore.setState(value);
  }
  disconnectedCallback() {
    this.root.unmount();
  }
  connectedCallback() {
    this.root = createRoot(this);
    this.root.render(<App />);
  }
}
customElements.define('react-panel', ReactWrapper);
