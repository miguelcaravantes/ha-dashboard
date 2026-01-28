import { useContext } from 'react';
import { HassContext } from '../HassProvider.js';
import type { HomeAssistant } from '../../types/home-assistant.js';

export function useHass(): HomeAssistant {
  const context = useContext(HassContext);
  if (context === null) {
    throw new Error('useHass must be used within a HassProvider');
  }
  return context;
}
