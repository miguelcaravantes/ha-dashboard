import useEntity from '../common/hooks/useEntity.js';
import Icon from './Icon.js';
import type { KnownEntityId } from '../types/entities.js';

interface BinarySensorProps {
  name?: string;
  entityId: KnownEntityId;
}

export default function BinarySensor({
  name: overrideName,
  entityId,
}: BinarySensorProps) {
  const { name: entityName, icon } = useEntity(entityId);

  const name = overrideName ?? entityName;
  return (
    <div className="h-24 w-24 flex flex-col justify-start items-center text-center">
      <div className="w-20 h-20 flex items-center justify-center">
        <Icon icon={icon} className="w-full h-full" />
      </div>
      <span className="text-sm truncate w-full">{name}</span>
    </div>
  );
}
