import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import hexRgb from 'hex-rgb';

import {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  brown,
} from '@mui/material/colors';
import { compose } from '../../common/composition';

const colors = ['#ffffff'].concat(
  [
    red,
    pink,
    purple,
    deepPurple,
    indigo,
    blue,
    lightBlue,
    cyan,
    teal,
    green,
    lightGreen,
    lime,
    yellow,
    amber,
    orange,
    deepOrange,
    brown,
  ].flatMap((i) => [i[200], i[500], i[700]])
);

const ColorsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
}));

const ColorButton = styled('button')(({ color, theme }) => ({
  background: color,
  border: 'none',
  borderRadius: '100%',
  height: theme.spacing(4),
  width: theme.spacing(4),
  outline: 'none',
}));

const removeAlpha = (rgba) => rgba.slice(0, 3);
const hexToRgb = (hex) => hexRgb(hex, { format: 'array' });

const LightColor = ({ onChange }) => {
  const handelColorClick = (hexColor) =>
    compose(onChange, removeAlpha, hexToRgb)(hexColor);
  return (
    <>
      <Typography variant="h6">Color:</Typography>
      <ColorsContainer>
        {colors.map((c) => (
          <ColorButton key={c} color={c} onClick={() => handelColorClick(c)} />
        ))}
      </ColorsContainer>
    </>
  );
};

export default LightColor;
