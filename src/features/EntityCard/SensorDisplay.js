import React from 'react';

const SensorDisplay = ({ entity: { state }, className }) => (
  <span className={className} css={{ fontSize: '1.5em', padding: '5px' }}>
    {state}
  </span>
);
export default SensorDisplay;
