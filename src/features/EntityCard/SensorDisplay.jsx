import { Box } from '@mui/material';

const SensorDisplay = ({ entity: { state, unitOfMeasurement }, className }) => (
  <Box sx={{ fontSize: '1.5em', padding: '5px' }}>
    <span className={className}>
      {state !== 'unavailable' ? (
        <>
          {state}
          {unitOfMeasurement}
        </>
      ) : (
        <Box sx={{ fontSize: '1rem' }}>
          <>Unavailable</>
        </Box>
      )}
    </span>
  </Box>
);
export default SensorDisplay;
