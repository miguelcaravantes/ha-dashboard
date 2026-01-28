import useEntity from '../common/hooks/useEntity.js';
import { styled } from '@mui/material/styles';
import Icon from './Icon.js';
import type { KnownEntityId } from '../types/entities.js';

const Root = styled('div')(({ theme }) => ({
  height: theme.spacing(12),
  width: theme.spacing(12),
  background: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const SensorIcon = styled(Icon)`
  width: 1.5em;
  height: 1.5em;
`;
const Label = styled('span')({
  fontSize: '2.6rem',
});

const LabelUnit = styled('span')({
  fontSize: '1rem',
  verticalAlign: 'super',
});

interface SensorProps {
  entityId: KnownEntityId;
}

export default function Sensor({ entityId }: SensorProps) {
  const { state, icon, unitOfMeasurement } = useEntity(entityId);
  const numericState = parseFloat(state);
  const roundedValue = isNaN(numericState)
    ? state
    : Math.round(numericState * 10) / 10;
  const display = roundedValue;

  return (
    <Root>
      <SensorIcon icon={icon} />
      <Label>
        {display}
        <LabelUnit>{unitOfMeasurement}</LabelUnit>
      </Label>
    </Root>
  );
}
