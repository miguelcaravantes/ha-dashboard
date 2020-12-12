import React from 'react';
import useEntity from '../common/hooks/useEntity';
import Icon from './Icon';
import styled from '@emotion/styled';

const Root = styled.div`
  height: ${({ theme }) => theme.spacing(12)};
  width: ${({ theme }) => theme.spacing(12)};
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  text-align: center;
`;

const SensorIcon = styled(Icon)`
  width: ${({ theme }) => theme.spacing(8)};
  height: ${({ theme }) => theme.spacing(8)};
`;

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
