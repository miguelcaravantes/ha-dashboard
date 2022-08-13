import { Store } from 'mdi-material-ui';
import { useContext, useSyncExternalStore } from 'react';
import { hassStore } from '../../index';

export function useHass() {
  const hass = useSyncExternalStore(
    hassStore.subscribe,
    hassStore.getSnapshot,
    hassStore.getServerSnapshot
  );
  return hass;
}
