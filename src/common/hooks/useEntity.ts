import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';
import { hassStore } from '../hassStore.js';
import { useCallback, useMemo } from 'react';
import shallowEqual from 'shallowequal';
import type { HassEntity } from 'home-assistant-js-websocket';
import type { HomeAssistant } from '../../types/home-assistant.js';
import type { KnownEntityId } from '../../types/entities.js';
import { isString, isNumber, isObject } from '../utils/typeGuards.js';

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

export const actionTypes = ActionType;

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
  deviceClass?: string,
): string | undefined => {
  const domainIcon = domainMapping[domain];
  const icon =
    typeof domainIcon === 'object'
      ? domainIcon[isGroup ? 'group' : 'default']
      : domainIcon;

  const classIcon = deviceClass ? classMapping[deviceClass] : undefined;
  let stateSpecificIcon: string | undefined;
  if (isObject(classIcon)) {
    const val = classIcon[state];
    if (isString(val)) {
      stateSpecificIcon = val;
    }
  } else if (isString(classIcon)) {
    stateSpecificIcon = classIcon;
  }

  let domainClassIcon: string | undefined;
  const domainMappingEntry = classMapping[domain];
  if (isObject(domainMappingEntry)) {
    const val = domainMappingEntry[state];
    if (isString(val)) {
      domainClassIcon = val;
    }
  }

  return stateIcon ?? stateSpecificIcon ?? domainClassIcon ?? icon;
};

const openMoreInfo = (entityId: string) => {
  const eventMoreInfo = new CustomEvent('hass-more-info', {
    detail: { entityId },
    bubbles: true,
    composed: true,
  });

  const parent = window.parent;
  if (isObject(parent) && 'customPanel' in parent) {
    const customPanel = parent.customPanel;
    if (isObject(customPanel) && 'parentNode' in customPanel) {
      const p1 = customPanel.parentNode;
      if (isObject(p1) && 'parentNode' in p1) {
        const p2 = p1.parentNode;
        if (isObject(p2) && 'offsetParent' in p2) {
          const op = p2.offsetParent;
          if (isObject(op) && typeof op.querySelector === 'function') {
            const ha = op.querySelector('home-assistant');
            if (ha) {
              ha.dispatchEvent(eventMoreInfo);
              return;
            }
          }
        }
      }
    }
  }

  const ha = document.querySelector('home-assistant');
  if (ha) {
    ha.dispatchEvent(eventMoreInfo);
  } else {
    window.dispatchEvent(eventMoreInfo);
  }
};

export interface UseEntityResult<T extends HassEntity = HassEntity> {
  domain: string;
  name: string | undefined;
  state: string;
  stateObj: T | undefined;
  isGroup: boolean;
  groupCount: number | undefined;
  groupEntities: string[] | undefined;
  unitOfMeasurement: string | undefined;
  supportedFeatures: number | undefined;
  actionType: ActionType | undefined;
  toggle: () => Promise<void>;
  execute: () => Promise<void>;
  openMoreInfo: () => void;
  icon: string | undefined;
}

export default function useEntity<T extends HassEntity = HassEntity>(
  entityId: KnownEntityId,
): UseEntityResult<T> {
  const { stateObj, callService } = useSyncExternalStoreWithSelector(
    hassStore.subscribe,
    hassStore.getSnapshot,
    hassStore.getServerSnapshot,
    (snapshot: HomeAssistant | undefined) => {
      const state = snapshot?.states[entityId];
      // Use a type guard to narrow to T without using 'as'
      const isT = (s: HassEntity | undefined): s is T | undefined => true;
      return {
        callService: snapshot?.callService,
        stateObj: isT(state) ? state : undefined,
      };
    },
    shallowEqual,
  );

  const domain = entityId.split('.')[0] || '';

  const actionType = actionTypesMap.get(domain);

  const attributes = stateObj?.attributes || {};

  const entityIds = attributes.entity_id;
  const groupEntities =
    Array.isArray(entityIds) && entityIds.every(isString)
      ? entityIds
      : undefined;
  const childrenLength = groupEntities?.length;
  const isGroup = !!groupEntities && groupEntities.length > 1;

  const unitOfMeasurement = isString(attributes.unit_of_measurement)
    ? attributes.unit_of_measurement
    : undefined;

  const deviceClass = isString(attributes.device_class)
    ? attributes.device_class
    : undefined;

  const supportedFeatures = isNumber(attributes.supported_features)
    ? attributes.supported_features
    : undefined;

  const state = stateObj?.state || 'unknown';
  const stateIcon = isString(attributes.icon) ? attributes.icon : undefined;

  const icon = useMemo(
    () => getIcon(domain, isGroup, state, stateIcon, deviceClass),
    [domain, isGroup, state, stateIcon, deviceClass],
  );

  const handleOpenMoreInfo = useCallback(
    () => openMoreInfo(entityId),
    [entityId],
  );

  const toggle = useCallback(async () => {
    if (actionType === ActionType.Toggle && callService) {
      await callService(domain, 'toggle', {
        entity_id: entityId,
      });
    }
  }, [actionType, callService, domain, entityId]);

  const execute = useCallback(async () => {
    if (callService) {
      await callService(domain, 'turn_on', {
        entity_id: entityId,
      });
    }
  }, [callService, domain, entityId]);

  return {
    domain,
    name: isString(attributes.friendly_name)
      ? attributes.friendly_name
      : undefined,
    state,
    stateObj,
    isGroup,
    groupCount: isGroup ? childrenLength : undefined,
    groupEntities,
    unitOfMeasurement,
    supportedFeatures,
    actionType,
    toggle,
    execute,
    openMoreInfo: handleOpenMoreInfo,
    icon,
  };
}
