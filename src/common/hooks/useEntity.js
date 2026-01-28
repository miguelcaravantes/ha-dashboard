import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';
import { hassStore } from '../../index';
import { useCallback, useMemo } from 'react';
import shallowEqual from 'shallowequal';

const domainMapping = {
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

const getIcon = (domain, isGroup, state, stateIcon, deviceClass) => {
  const domainIcon = domainMapping[domain];
  const icon =
    typeof domainIcon === 'object'
      ? domainIcon[isGroup ? 'group' : 'default']
      : domainIcon;
  return (
    stateIcon ??
    classMapping[deviceClass ?? domain]?.[state] ??
    (typeof classMapping[deviceClass] === 'string'
      ? classMapping[deviceClass]
      : undefined) ??
    icon
  );
};

const openMoreInfo = (entityId) => {
  const eventMoreInfo = new Event('hass-more-info');
  eventMoreInfo.detail = { entityId };
  window.parent.customPanel.parentNode.parentNode.offsetParent
    .querySelector('home-assistant')
    .dispatchEvent(eventMoreInfo);
};

export default function useEntity(entityId) {
  const { stateObj, callService } = useSyncExternalStoreWithSelector(
    hassStore.subscribe,
    hassStore.getSnapshot,
    hassStore.getServerSnapshot,
    (snapshot) => ({
      callService: snapshot.callService,
      stateObj: snapshot.states[entityId],
    }),
    shallowEqual
  );

  const domain = entityId.split('.')[0];

  const actionType = actionTypesMap.get(domain);

  const childrenLength = stateObj.attributes.entity_id?.length;
  const isGroup = childrenLength > 1;

  const unitOfMeasurement = stateObj.attributes.unit_of_measurement;
  const deviceClass = stateObj.attributes.device_class;
  const supportedFeatures = stateObj.attributes.supported_features;

  const state = stateObj.state;
  const stateIcon = stateObj.attributes.icon;

  const icon = useMemo(
    () => getIcon(domain, isGroup, state, stateIcon, deviceClass),
    [domain, isGroup, state, stateIcon, deviceClass]
  );

  const handleOpenMoreInfo = useCallback(
    () => openMoreInfo(entityId),
    [entityId]
  );

  const toggle = useCallback(() => {
    if (actionType === actionTypes.Toggle) {
      callService(domain, 'toggle', {
        entity_id: entityId,
      });
    }
  }, [actionType, callService, domain, entityId]);

  const execute = useCallback(() => {
    callService(domain, 'turn_on', {
      entity_id: entityId,
    });
  }, [callService, domain, entityId]);

  return {
    domain,
    name: stateObj.attributes.friendly_name,
    state: stateObj.state,
    stateObj,
    isGroup,
    groupCount: isGroup ? childrenLength : undefined,
    groupEntities: isGroup ? stateObj.attributes.entity_id : undefined,
    unitOfMeasurement,
    supportedFeatures,
    actionType,
    toggle,
    execute,
    openMoreInfo: handleOpenMoreInfo,
    icon,
  };
}
