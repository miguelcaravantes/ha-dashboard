import React from 'react';
import styled from 'styled-components';
import {
  ButtonGroup,
  Button,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import useEntity from '../hooks/useEntity';
import { useHass } from '../hooks/useHass';

const Root = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const speedNames = {
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
  const { stateObj } = useEntity(entityId);
  const { oscillating, speed, speed_list: speedList } = stateObj.attributes;

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
      <FormControlLabel
        labelPlacement="start"
        control={
          <Switch checked={oscillating} onChange={handleChangeOscillation} />
        }
        label="Oscillate"
      />
      <ButtonGroup
        size="large"
        color="primary"
        aria-label="large outlined primary button group"
      >
        {speedList.map((s) => (
          <SpeedButton
            key={s}
            speed={s}
            active={speed === s}
            onClick={() => handleChangeSpeed(s)}
          />
        ))}
      </ButtonGroup>
    </Root>
  );
}
