import React from 'react';
import { styled } from '@mui/material/styles';
import LightBrightness from './LightBrightness';
import LightColor from './LightColor';
import useLightDetail from './useLightDetail';
import useEntity from '../../common/hooks/useEntity';
import LightGroup from './LightGroup';

const Root = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

export default function LightDetail({ entityId }) {
  const { isGroup } = useEntity(entityId);
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
      {isGroup && <LightGroup entityId={entityId} />}
    </Root>
  );
}
