import { useHass } from './useHass';
import { useCallback, useMemo } from 'react';
const domainMapping = {
  light: 'mdi:lightbulb',
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

const classMapping = {
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
};

export const actionTypes = {
  Execute: 'EXECUTE',
  Toggle: 'TOGGLE',
};
const actionTypesMap = new Map([
  ['switch', actionTypes.Toggle],
  ['fan', actionTypes.Toggle],
  ['light', actionTypes.Toggle],
  ['scene', actionTypes.Execute],
  ['script', actionTypes.Execute],
]);

export default function useEntity(entityId) {
  const { states, callService } = useHass();

  const stateObj = states[entityId];
  const domain = entityId.split('.')[0];

  const actionType = actionTypesMap.get(domain);

  const children = stateObj.attributes.entity_id?.length;
  const isGroup = children > 1;

  const unitOfMeasurement = stateObj.attributes.unit_of_measurement;
  const deviceClass = stateObj.attributes.device_class;
  const supportedFeatures = stateObj.attributes.supported_features;

  const state = stateObj.state;

  let icon = useMemo(() => {
    let icon = '';

    const domainIcon = domainMapping[domain];
    if (domainIcon) {
      if (domain === 'light' && isGroup) {
        icon = 'mdi:lightbulb-group';
      } else {
        icon = domainIcon;
      }
    }

    icon = stateObj.attributes.icon || icon;

    return icon;
  }, [domain, stateObj.attributes.icon]);

  icon =
    (classMapping[deviceClass] && classMapping[deviceClass][state]) ?? icon;

  const toggle = useCallback(() => {
    if (actionType === actionTypes.Toggle) {
      callService(domain, 'toggle', {
        entity_id: entityId,
      });
    }
  }, [entityId]);

  const execute = useCallback(() => {
    callService(domain, 'turn_on', {
      entity_id: entityId,
    });
  }, [entityId]);

  return {
    domain,
    name: stateObj.attributes.friendly_name,
    state: stateObj.state,
    stateObj,
    isGroup,
    groupCount: isGroup ? children : undefined,
    unitOfMeasurement,
    supportedFeatures,
    actionType,
    toggle,
    execute,
    icon,
  };
}
