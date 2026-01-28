import Icon from './Icon.js';
import useEntity from '../common/hooks/useEntity.js';
import type { KnownEntityId } from '../types/entities.js';

interface EntityIconProps {
  entityId: KnownEntityId;
}

export default function EntityIcon({ entityId }: EntityIconProps) {
  const { icon } = useEntity(entityId);
  return <Icon icon={icon} />;
}
