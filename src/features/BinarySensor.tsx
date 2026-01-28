import useEntity from '../common/hooks/useEntity.js';
import Icon from './Icon.js';
import { styled } from '@mui/material/styles';
import type { KnownEntityId } from '../types/entities.js';

const Root = styled('div')(({ theme }) => ({
  height: theme.spacing(12),
  width: theme.spacing(12),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  textAlign: 'center',
}));

const SensorIcon = styled(Icon)(({ theme }) => ({
  width: theme.spacing(8),
  height: theme.spacing(8),
}));

interface BinarySensorProps {
  name?: string;
  entityId: KnownEntityId;
}

export default function BinarySensor({
  name: overrideName,
  entityId,
}: BinarySensorProps) {
  const { name: entityName, icon } = useEntity(entityId);

  const name = overrideName ?? entityName;
  return (
    <Root>
      <SensorIcon icon={icon} />
      {name}
    </Root>
  );
}
