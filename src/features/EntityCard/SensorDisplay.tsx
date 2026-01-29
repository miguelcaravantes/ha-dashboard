import type { UseEntityResult } from '../../common/hooks/useEntity.js';
import { cn } from '@/lib/utils.js';

interface SensorDisplayProps {
  entity: UseEntityResult;
  className?: string;
  color?: string; // color prop is passed but not used here, but for consistency in actions map
}

const SensorDisplay = ({
  entity: { state, unitOfMeasurement },
  className,
}: SensorDisplayProps) => (
  <div className="flex flex-col items-end leading-none">
    {unitOfMeasurement && (
      <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 mb-0.5">
        {unitOfMeasurement}
      </span>
    )}
    <span
      className={cn(
        'text-3xl font-semibold tracking-tight tabular-nums',
        className,
      )}
    >
      {state !== 'unavailable' ? state : '—'}
    </span>
  </div>
);

export default SensorDisplay;
