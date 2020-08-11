import React, { useState } from 'react';
import useEntity from '../hooks/useEntity';
import { Slider, Dialog } from '@material-ui/core';
import { useHass } from '../hooks/useHass';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import styled from 'styled-components';

const Root = styled(Dialog)`
& .MuiDialog-paper{
  width: 80%;
  padding: ${({ theme }) => theme.spacing(2)};
}
`;

const StyledSlider = styled(Slider)`
  color: ${({ theme }) =>
    theme.palette.type === 'dark'
      ? theme.palette.text.primary
      : theme.palette.primary.light};
  height: 40px;
  & .MuiSlider-rail {
    height: 40px;
    border-radius: 2px;
  }
  & .MuiSlider-track {
    height: 40px;
    border-radius: 2px;
  }
  & .MuiSlider-thumb {
    display: none;
  }
`;

export default function LightDetail(props) {
  const { onClose, open, entityId } = props;

  const { callService } = useHass();
  const { stateObj } = useEntity(entityId);
  const [value, setValue] = useState(stateObj.attributes.brightness || 0);

  const callServiceDebounced = AwesomeDebouncePromise(callService, 100);

  const handleChange = async (event, newValue) => {
    setValue(newValue);
    await callServiceDebounced('light', 'turn_on', {
      entity_id: entityId,
      brightness: newValue,
    });
  };

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <Root onClose={handleClose} open={open}>
      <StyledSlider
        min={1}
        max={255}
        value={value}
        valueLabelDisplay="auto"
        disabled={stateObj.state === 'off'}
        onChange={handleChange}
      />
    </Root>
  );
}
