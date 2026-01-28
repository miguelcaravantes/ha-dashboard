export type EntityId = `${string}.${string}`;

export type KnownDomain =
  | 'light'
  | 'switch'
  | 'sensor'
  | 'binary_sensor'
  | 'fan'
  | 'climate'
  | 'media_player'
  | 'vacuum'
  | 'cover'
  | 'lock'
  | 'weather'
  | 'camera'
  | 'input_boolean'
  | 'input_select'
  | 'input_number'
  | 'input_datetime'
  | 'input_text'
  | 'scene'
  | 'script'
  | 'automation'
  | 'person'
  | 'sun'
  | 'zone'
  | 'persistent_notification';

export type KnownEntityId = `${KnownDomain}.${string}` | (string & {});

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: {
    friendly_name?: string;
    icon?: string;
    unit_of_measurement?: string;
    [key: string]: any;
  };
  last_changed: string;
  last_updated: string;
  context: {
    id: string;
    parent_id: string | null;
    user_id: string | null;
  };
}

export type HassEntities = Record<string, HassEntity>;
