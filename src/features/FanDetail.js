import React from 'react';
import { styled } from '@material-ui/core/styles';
import { ButtonGroup, Button, Switch, Typography } from '@material-ui/core';
import useEntity from '../common/hooks/useEntity';
import { useHass } from '../common/hooks/useHass';
import { FAN_SUPPORT_SET_SPEED, FAN_SUPPORT_OSCILLATE } from '../constants';

const Root = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

const speedNames = {
  eco: 'Eco',
  low: 'Low',
  medium: 'Med',
  high: 'High',
};
const SpeedButton = ({ speed, active, ...props }) => {
  const name = speedNames[speed];
  return (
    <Button {...props} variant={active ? 'contained' : 'outlined'}>
      {name}
    </Button>
  );
};

export default function FanDetail({ entityId }) {
  const { callService } = useHass();
  const { stateObj, supportedFeatures } = useEntity(entityId);
  const { oscillating, speed, speed_list: speedList } = stateObj.attributes;

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

  const handleChangeSpeed = (newSpeed) => {
    callService('fan', 'set_speed', {
      entity_id: entityId,
      speed: newSpeed,
    });
  };

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
          <ButtonGroup color="primary">
            {speedList.map((s) => (
              <SpeedButton
                key={s}
                speed={s}
                active={speed === s}
                onClick={() => handleChangeSpeed(s)}
              />
            ))}
          </ButtonGroup>
        </>
      )}
    </Root>
  );
}
