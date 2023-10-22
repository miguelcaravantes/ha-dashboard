import React from 'react';
import { Switch } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

const StyledSwitch = styled(({ overrideColor, ...props }) => (
  <Switch {...props} />
))((props) => ({
  '.MuiSwitch-switchBase': {
    '&.Mui-checked': {
      color: props.overrideColor[100],
      '&:hover': {
        backgroundColor: alpha(
          props.overrideColor[100],
          props.theme.palette.action.hoverOpacity
        ),
      },
    },
    '&.Mui-checked + .MuiSwitch-track': {
      backgroundColor: props.overrideColor[100],
    },
  },
}));

const PowerSwitch = ({ entity: { state, toggle }, color, className }) => (
  <StyledSwitch
    className={className}
    overrideColor={color}
    checked={state === 'on'}
    onChange={toggle}
  />
);

export default PowerSwitch;
