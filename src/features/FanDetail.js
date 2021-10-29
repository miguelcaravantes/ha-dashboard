import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Slider, Switch, Typography, Box } from '@mui/material';
import useEntity from '../common/hooks/useEntity';
import { useHass } from '../common/hooks/useHass';
import { FAN_SUPPORT_SET_SPEED, FAN_SUPPORT_OSCILLATE } from '../constants';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import useConstant from 'use-constant';

const Root = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

export default function FanDetail({ entityId }) {
  const { callService } = useHass();
  const { stateObj, supportedFeatures } = useEntity(entityId);
  const {
    oscillating,
    percentage_step: percentageStep,
    percentage,
  } = stateObj.attributes;
  const [localPercentage, setLocalPercentage] = useState(percentage);

  const doesSupportSpeed = Boolean(supportedFeatures & FAN_SUPPORT_SET_SPEED);
  const doesSupportOscillate = Boolean(
    supportedFeatures & FAN_SUPPORT_OSCILLATE
  );

  const handleChangeOscillation = () => {
    callService('fan', 'oscillate', {
      entity_id: entityId,
      oscillating: !oscillating,
    });
  };
  const handleSpeedChange = (value) => {
    setLocalPercentage(value);
    updatePercentage(value);
  };

  const updatePercentage = useConstant(() =>
    AwesomeDebouncePromise(async (percentage) => {
      await callService('fan', 'set_percentage', {
        entity_id: entityId,
        percentage,
      });
    }, 100)
  );

  return (
    <Root>
      {doesSupportOscillate && (
        <>
          <Typography variant="h6">Oscillate:</Typography>
          <Switch checked={oscillating} onChange={handleChangeOscillation} />
        </>
      )}
      {doesSupportSpeed && (
        <>
          <Typography variant="h6">Speed:</Typography>
          <Box sx={{ px: 3, width: '100%' }}>
            <Slider
              min={0}
              max={100}
              step={percentageStep}
              value={localPercentage}
              valueLabelDisplay="auto"
              onChange={(e) => handleSpeedChange(e.target.value)}
            />
          </Box>
        </>
      )}
    </Root>
  );
}
