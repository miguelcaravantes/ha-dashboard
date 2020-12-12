import React from 'react';
import styled from '@emotion/styled';
import LightBrightness from './LightBrightness';
import LightColor from './LightColor';
import useLightDetail from './useLightDetail';

const Root = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

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
