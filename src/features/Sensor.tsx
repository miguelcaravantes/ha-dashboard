import useEntity from '../common/hooks/useEntity.js';
import Icon from './Icon.js';
import type { KnownEntityId } from '../types/entities.js';

interface SensorProps {
  entityId: KnownEntityId;
}

export default function Sensor({ entityId }: SensorProps) {
  const { state, icon, unitOfMeasurement } = useEntity(entityId);
  const numericState = parseFloat(state);
  const roundedValue = isNaN(numericState)
    ? state
    : Math.round(numericState * 10) / 10;
  const display = roundedValue;

  return (
    <div className="h-24 w-24 flex flex-col items-center justify-center bg-transparent">
      <div className="w-8 h-8 flex items-center justify-center mb-1">
        <Icon icon={icon} className="w-full h-full" />
      </div>
      <span className="text-3xl font-semibold leading-none">
        {display}
        <span className="text-sm align-super ml-0.5 font-medium">
          {unitOfMeasurement}
        </span>
      </span>
    </div>
  );
}
