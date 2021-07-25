import React from 'react';
import { styled } from '@material-ui/core/styles';
import LightBrightness from './LightBrightness';
import LightColor from './LightColor';
import useLightDetail from './useLightDetail';

const Root = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

export default function LightDetail({ entityId }) {
  const {
    doesSupportColor,
    doesSupportBrightness,
    brightness,
    handleColorChange,
    handleBrightnessChange,
  } = useLightDetail(entityId);
  return (
    <Root>
      {doesSupportColor && <LightColor onChange={handleColorChange} />}
      {doesSupportBrightness && (
        <LightBrightness value={brightness} onChange={handleBrightnessChange} />
      )}
    </Root>
  );
}
