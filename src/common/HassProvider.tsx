import { createContext, useSyncExternalStore, type ReactNode } from 'react';
import type { HomeAssistant } from '../types/home-assistant.js';

interface HassStore {
  setState: (newState: HomeAssistant) => void;
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => HomeAssistant;
  getServerSnapshot: () => HomeAssistant;
}

function createStore(
  initialState: HomeAssistant = {} as HomeAssistant
): HassStore {
  let state = initialState;
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

export const HassContext = createContext<HomeAssistant | null>(null);

interface HassProviderProps {
  children: ReactNode;
}

export function HassProvider({ children }: HassProviderProps) {
  const hass = useSyncExternalStore(
    hassStore.subscribe,
    hassStore.getSnapshot,
    hassStore.getServerSnapshot
  );

  return <HassContext.Provider value={hass}>{children}</HassContext.Provider>;
}
