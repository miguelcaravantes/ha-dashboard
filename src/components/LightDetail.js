import React, { useState } from 'react';
import useEntity from '../hooks/useEntity';
import { Slider, Dialog } from '@material-ui/core';
import { useHass } from '../hooks/useHass';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import styled from 'styled-components';
import useConstant from 'use-constant';

const Root = styled(Dialog)`
    backdrop-filter: blur(5px);
  & .MuiDialog-paper {
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
    box-shadow: 0px 0px 10px 0px rgba(255,255,255,.7);
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

  const updateBrightness = useConstant(() =>
    AwesomeDebouncePromise(async (brightness) => {
      console.log(brightness)
      await callService('light', 'turn_on', {
        entity_id: entityId,
        brightness,
      });
    }, 100)
  );

  const handleChange = async (event, newValue) => {
    if (newValue !== value) {
      setValue(newValue);
      await updateBrightness(newValue);
    }
  };

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <Root onClose={handleClose} open={open}>
      <StyledSlider
        min={0}
        max={255}
        step={15}
        value={value}
        valueLabelDisplay="auto"
        // disabled={stateObj.state === 'off'}
        onChange={handleChange}
      />
    </Root>
  );
}
