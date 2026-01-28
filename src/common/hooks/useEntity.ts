import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';
import { hassStore } from '../HassProvider.js';
import { useCallback, useMemo } from 'react';
import shallowEqual from 'shallowequal';
import type { HassEntity } from 'home-assistant-js-websocket';
import type { HomeAssistant } from '../../types/home-assistant.js';

type DomainIcon = string | { default: string; group: string };

const domainMapping: Record<string, DomainIcon> = {
  light: {
    default: 'mdi:lightbulb-outline',
    group: 'mdi:lightbulb-group-outline',
  },
  switch: 'mdi:power-socket-us',
  media_player: 'mdi:cast',
  scene: 'mdi:palette',
  person: 'mdi:account',
  device_tracker: 'mdi:account',
  fan: 'mdi:fan',
  script: 'mdi:script-text',
  input_boolean: 'mdi:toggle-switch',
  input_select: 'mdi:format-list-bulleted',
  remote: 'mdi:remote',
  sun: 'mdi:weather-sunny',
  weather: 'mdi:weather-cloudy',
  sensor: 'mdi:eye',
};

const classMapping: Record<string, string | Record<string, string>> = {
  window: {
    on: 'mdi:window-open-variant',
    off: 'mdi:window-closed-variant',
  },
  moisture: {
    on: 'mdi:water',
    off: 'mdi:water-off',
  },
  door: {
    on: 'mdi:door-open',
    off: 'mdi:door-closed',
  },
  motion: {
    on: 'mdi:motion-sensor',
    off: 'mdi:motion-sensor-off',
  },
  shade: {
    open: 'mdi:roller-shade',
    closed: 'mdi:roller-shade-closed',
    closing: 'mdi:roller-shade',
    opening: 'mdi:roller-shade',
  },
  temperature: 'mdi:thermometer',
  humidity: 'mdi:water-percent',
};

export enum ActionType {
  Execute = 'EXECUTE',
  Toggle = 'TOGGLE',
}

const actionTypesMap = new Map<string, ActionType>([
  ['switch', ActionType.Toggle],
  ['fan', ActionType.Toggle],
  ['light', ActionType.Toggle],
  ['scene', ActionType.Execute],
  ['script', ActionType.Execute],
]);

const getIcon = (
  domain: string,
  isGroup: boolean,
  state: string,
  stateIcon?: string,
  deviceClass?: string
): string | undefined => {
  const domainIcon = domainMapping[domain];
  const icon =
    typeof domainIcon === 'object'
      ? domainIcon[isGroup ? 'group' : 'default']
      : domainIcon;

  const classIcon = deviceClass ? classMapping[deviceClass] : undefined;
  const stateSpecificIcon =
    typeof classIcon === 'object' ? classIcon[state] : classIcon;

  return (
    stateIcon ??
    stateSpecificIcon ??
    (classMapping[domain] && typeof classMapping[domain] === 'object'
      ? (classMapping[domain] as Record<string, string>)[state]
      : undefined) ??
    icon
  );
};

const openMoreInfo = (entityId: string) => {
  const eventMoreInfo = new CustomEvent('hass-more-info', {
    detail: { entityId },
    bubbles: true,
    composed: true,
  });

  const ha = document.querySelector('home-assistant');
  if (ha) {
    ha.dispatchEvent(eventMoreInfo);
  } else {
    window.dispatchEvent(eventMoreInfo);
  }
};

export interface UseEntityResult {
  domain: string;
  name: string | undefined;
  state: string;
  stateObj: HassEntity | undefined;
  isGroup: boolean;
  groupCount: number | undefined;
  groupEntities: string[] | undefined;
  unitOfMeasurement: string | undefined;
  supportedFeatures: number | undefined;
  actionType: ActionType | undefined;
  toggle: () => void;
  execute: () => void;
  openMoreInfo: () => void;
  icon: string | undefined;
}

export default function useEntity(entityId: string): UseEntityResult {
  const { stateObj, callService } = useSyncExternalStoreWithSelector(
    hassStore.subscribe,
    hassStore.getSnapshot,
    hassStore.getServerSnapshot,
    (snapshot: HomeAssistant) => ({
      callService: snapshot.callService,
      stateObj: snapshot.states ? snapshot.states[entityId] : undefined,
    }),
    shallowEqual
  );

  const domain = entityId.split('.')[0] || '';

  const actionType = actionTypesMap.get(domain);

  const attributes = stateObj?.attributes || {};
  const childrenLength = (attributes as any).entity_id?.length;
  const isGroup =
    Array.isArray((attributes as any).entity_id) &&
    (attributes as any).entity_id.length > 1;

  const unitOfMeasurement = attributes.unit_of_measurement;
  const deviceClass = (attributes as any).device_class;
  const supportedFeatures = (attributes as any).supported_features;

  const state = stateObj?.state || 'unknown';
  const stateIcon = attributes.icon;

  const icon = useMemo(
    () => getIcon(domain, isGroup, state, stateIcon, deviceClass),
    [domain, isGroup, state, stateIcon, deviceClass]
  );

  const handleOpenMoreInfo = useCallback(
    () => openMoreInfo(entityId),
    [entityId]
  );

  const toggle = useCallback(() => {
    if (actionType === ActionType.Toggle && callService) {
      callService(domain, 'toggle', {
        entity_id: entityId,
      });
    }
  }, [actionType, callService, domain, entityId]);

  const execute = useCallback(() => {
    if (callService) {
      callService(domain, 'turn_on', {
        entity_id: entityId,
      });
    }
  }, [callService, domain, entityId]);

  return {
    domain,
    name: attributes.friendly_name,
    state,
    stateObj,
    isGroup,
    groupCount: isGroup ? childrenLength : undefined,
    groupEntities: isGroup ? (attributes as any).entity_id : undefined,
    unitOfMeasurement,
    supportedFeatures,
    actionType,
    toggle,
    execute,
    openMoreInfo: handleOpenMoreInfo,
    icon,
  };
}
