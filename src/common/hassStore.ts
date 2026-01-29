import type { HomeAssistant } from '../types/home-assistant.js';

interface HassStore {
  setState: (newState: HomeAssistant) => void;
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => HomeAssistant | undefined;
  getServerSnapshot: () => HomeAssistant | undefined;
}

function createStore(): HassStore {
  let state: HomeAssistant | undefined;
  const listeners = new Set<() => void>();

  function setState(newState: HomeAssistant) {
    state = newState;
    listeners.forEach((notify) => notify());
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function getSnapshot() {
    return state;
  }

  function getServerSnapshot() {
    return state;
  }

  return { setState, subscribe, getSnapshot, getServerSnapshot };
}

export const hassStore = createStore();
