import type { UseEntityResult } from "../../common/hooks/useEntity.js";
import { type Color } from "@mui/material";

interface SensorDisplayProps {
  entity: UseEntityResult;
  className?: string;
  color?: Color; // color prop is passed but not used here, but for consistency in actions map
}

const SensorDisplay = ({
  entity: { state, unitOfMeasurement },
  className,
}: SensorDisplayProps) => (
  <div className="p-1 text-[1.5em]">
    <span className={className}>
      {state !== "unavailable" ? (
        <>
          {state}
          {unitOfMeasurement}
        </>
      ) : (
        <div className="text-[1rem]">Unavailable</div>
      )}
    </span>
  </div>
);

export default SensorDisplay;
