import { useContext } from 'react';
import { HassContext } from '../HassContext';

export function useHass() {
  const hass = useContext(HassContext);
  return hass;
}
