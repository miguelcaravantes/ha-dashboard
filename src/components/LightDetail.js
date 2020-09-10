import React, { useState, useEffect } from 'react';
import useEntity from '../common/hooks/useEntity';
import { Slider, Typography } from '@material-ui/core';
import { useHass } from '../common/hooks/useHass';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import styled from 'styled-components';
import useConstant from 'use-constant';
import { CirclePicker } from 'react-color';
import { LIGHT_SUPPORT_COLOR, LIGHT_SUPPORT_BRIGHTNESS } from '../constants';
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

const Root = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
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
    box-shadow: 0px 0px 10px 0px rgba(255, 255, 255, 0.7);
  }
  & .MuiSlider-thumb {
    display: none;
  }
`;

const ColorsContainer = styled.div`
  & .circle-picker {
    width: 100% !important;
    justify-content: center;
    margin: ${({ theme }) => theme.spacing(2)} !important;
  }
`;

export default function LightDetail(props) {
  const { entityId } = props;

  const { callService } = useHass();
  const { stateObj, state, supportedFeatures } = useEntity(entityId);
  const [brightness, setBrightness] = useState(
    stateObj.attributes.brightness ?? 0
  );

  useEffect(() => {
    setBrightness(stateObj.attributes.brightness ?? 0);
    // disabled since it comes from outside react
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const doesSupportColor = Boolean(supportedFeatures & LIGHT_SUPPORT_COLOR);
  const doesSupportBrightness = Boolean(
    supportedFeatures & LIGHT_SUPPORT_BRIGHTNESS
  );

  const updateBrightness = useConstant(() =>
    AwesomeDebouncePromise(async (brightness) => {
      await callService('light', 'turn_on', {
        entity_id: entityId,
        brightness,
      });
    }, 100)
  );
  const updateColor = useConstant(() =>
    AwesomeDebouncePromise(async (color) => {
      const data = {
        entity_id: entityId,
        rgb_color: [color.r, color.g, color.b],
      };
      if (stateObj.state === 'off') {
        data.brightness = 255;
        setBrightness(255);
      }

      await callService('light', 'turn_on', data);
    }, 100)
  );

  const handleBrightnessChange = async (_, newValue) => {
    if (newValue !== brightness) {
      setBrightness(newValue);
      await updateBrightness(newValue);
    }
  };

  const handleColorChange = async (color) => {
    await updateColor(color.rgb);
  };

  return (
    <Root>
      {doesSupportColor && (
        <>
          <Typography variant="h6">Color:</Typography>
          <ColorsContainer>
            <CirclePicker
              colors={colors}
              circleSize={32}
              circleSpacing={8}
              onChange={handleColorChange}
            />
          </ColorsContainer>
        </>
      )}
      {doesSupportBrightness && (
        <>
          <Typography variant="h6">Brightness:</Typography>
          <StyledSlider
            min={0}
            max={255}
            step={15}
            value={brightness}
            valueLabelDisplay="auto"
            onChange={handleBrightnessChange}
          />
        </>
      )}
    </Root>
  );
}
