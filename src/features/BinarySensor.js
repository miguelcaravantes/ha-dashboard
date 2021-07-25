import React from 'react';
import useEntity from '../common/hooks/useEntity';
import Icon from './Icon';
import { styled } from '@material-ui/core/styles';

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

export default function BinarySensor(props) {
  const { name: overrideName, entityId } = props;
  const { name: entityName, icon } = useEntity(entityId);

  const name = overrideName ?? entityName;
  return (
    <Root>
      <SensorIcon icon={icon} />
      {name}
    </Root>
  );
}
