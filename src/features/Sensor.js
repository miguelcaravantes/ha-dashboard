import React from 'react';
import useEntity from '../common/hooks/useEntity';
import { styled } from '@material-ui/core/styles';
import Icon from './Icon';

const Root = styled('div')(({ theme }) => ({
  height: theme.spacing(12),
  width: theme.spacing(12),
  background: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifycontent: 'center',
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

export default function Sensor(props) {
  const { entityId } = props;
  const { state, icon, unitOfMeasurement } = useEntity(entityId);
  const roundedValue = Math.round(state * 10) / 10;
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
