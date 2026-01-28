import { useSyncExternalStore, type ReactNode } from 'react';
import { HassContext } from './HassContext.js';
import { hassStore } from './hassStore.js';

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
