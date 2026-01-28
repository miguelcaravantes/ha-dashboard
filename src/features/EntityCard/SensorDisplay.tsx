import { Box, type Color } from '@mui/material';
import type { UseEntityResult } from '../../common/hooks/useEntity.js';

interface SensorDisplayProps {
  entity: UseEntityResult;
  className?: string;
  color?: Color; // color prop is passed but not used here, but for consistency in actions map
}

const SensorDisplay = ({
  entity: { state, unitOfMeasurement },
  className,
}: SensorDisplayProps) => (
  <Box sx={{ fontSize: '1.5em', padding: '5px' }}>
    <span className={className}>
      {state !== 'unavailable' ? (
        <>
          {state}
          {unitOfMeasurement}
        </>
      ) : (
        <Box sx={{ fontSize: '1rem' }}>Unavailable</Box>
      )}
    </span>
  </Box>
);

export default SensorDisplay;
