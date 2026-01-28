import { useContext } from 'react';
import { HassContext } from '../HassContext.js';
import type { HomeAssistant } from '../../types/home-assistant.js';

export function useHass(): HomeAssistant {
  const context = useContext(HassContext);
  if (context === undefined) {
    throw new Error('useHass must be used within a HassProvider');
  }
  return context;
}
