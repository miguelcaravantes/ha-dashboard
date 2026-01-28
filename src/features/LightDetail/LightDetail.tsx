import { styled } from '@mui/material/styles';
import LightBrightness from './LightBrightness.js';
import LightColor from './LightColor.js';
import useLightDetail from './useLightDetail.js';
import useEntity from '../../common/hooks/useEntity.js';
import LightGroup from './LightGroup.js';
import type { KnownEntityId } from '../../types/entities.js';

const Root = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

interface LightDetailProps {
  entityId: KnownEntityId;
}

export default function LightDetail({ entityId }: LightDetailProps) {
  const { isGroup } = useEntity(entityId);
  const {
    doesSupportColor,
    doesSupportBrightness,
    brightness,
    handleColorChange,
    handleBrightnessChange,
    isPending,
  } = useLightDetail(entityId);

  return (
    <Root>
      {doesSupportColor && (
        <LightColor onChange={handleColorChange} disabled={isPending} />
      )}
      {doesSupportBrightness && (
        <LightBrightness
          value={brightness}
          onChange={handleBrightnessChange}
          disabled={isPending}
        />
      )}
      {isGroup && <LightGroup entityId={entityId} />}
    </Root>
  );
}
