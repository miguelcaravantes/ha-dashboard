import React from 'react';
import { Slider, Typography } from '@material-ui/core';
import styled from '@emotion/styled';

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
    box-shadow: 0px 0px 10px 0px rgba(255, 255, 255, 0.7);
  }
  & .MuiSlider-thumb {
    display: none;
  }
`;

const LightBrightness = ({ value, onChange }) => (
  <>
    <Typography variant="h6">Brightness:</Typography>
    <StyledSlider
      min={0}
      max={255}
      step={15}
      value={value}
      valueLabelDisplay="auto"
      onChange={onChange}
    />
  </>
);

export default LightBrightness;
