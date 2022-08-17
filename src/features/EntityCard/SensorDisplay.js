import React from 'react';
import { Box } from '@mui/material';

const SensorDisplay = ({ entity: { state, unitOfMeasurement }, className }) => (
  <Box csx={{ fontSize: '1.5em', padding: '5px' }}>
    <span className={className}>
      {state}
      {unitOfMeasurement}
    </span>
  </Box>
);
export default SensorDisplay;
