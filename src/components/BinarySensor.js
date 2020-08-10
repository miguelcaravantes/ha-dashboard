import React from 'react';
import useEntity from '../hooks/useEntity';
import IconWrapper from './IconWrapper';
import styled from 'styled-components';
import getIcon from './getIcon';

const Root = styled.div`
  height: ${({ theme }) => theme.spacing(12)};
  width: ${({ theme }) => theme.spacing(12)};
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const SensorIcon = styled(IconWrapper)`
  width: ${({ theme }) => theme.spacing(8)};
  height: ${({ theme }) => theme.spacing(8)};
`;

export default function BinarySensor(props) {
  const { name: overrideName, entityId } = props;
  const { name: entityName, icon } = useEntity(entityId);
  const Icon = getIcon(icon);

  const name = overrideName ?? entityName;
  return (
    <Root>
      <SensorIcon Icon={Icon} />
      { name }
    </Root>
  );
}
