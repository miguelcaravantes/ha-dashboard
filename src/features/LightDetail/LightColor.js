import React from 'react';
import { CirclePicker } from 'react-color';
import { Typography } from '@material-ui/core';
import styled from '@emotion/styled';

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
} from '@material-ui/core/colors';

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

const ColorsContainer = styled.div`
  & .circle-picker {
    width: 100% !important;
    justify-content: center;
    margin: ${({ theme }) => theme.spacing(2)} !important;
  }
`;

const LightColor = ({ onChange }) => (
  <>
    <Typography variant="h6">Color:</Typography>
    <ColorsContainer>
      <CirclePicker
        colors={colors}
        circleSize={32}
        circleSpacing={8}
        onChange={onChange}
      />
    </ColorsContainer>
  </>
);

export default LightColor;
