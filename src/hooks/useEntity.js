import { useHass } from './useHass';

export default function useEntity(entityId) {
  const hass = useHass();

  const stateObj = hass.states[entityId];
  const domain = entityId.split('.')[0];

  const isToggleable = ['switch', 'fan', 'light'].includes(domain);

  const isExecutable = ['scene', 'script'].includes(domain);

  const toggle = () => {
    hass.callService(domain, 'toggle', {
      entity_id: entityId,
    });
  };

  const execute = () => {
    hass.callService(domain, 'turn_on', {
      entity_id: entityId,
    });
  };

  return {
    stateObj,
    domain,
    isToggleable,
    isExecutable,
    toggle,
    execute,
  };
}
