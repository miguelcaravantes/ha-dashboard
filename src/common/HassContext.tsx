import { createContext } from 'react';
import type { HomeAssistant } from '../types/home-assistant.js';

const HassContext = createContext<HomeAssistant | undefined>(undefined);

export { HassContext };
