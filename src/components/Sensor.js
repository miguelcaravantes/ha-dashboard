import React from 'react';
import useEntity from '../hooks/useEntity';
import getIcon from './getIcon';
import styled from 'styled-components';
import IconWrapper from './IconWrapper';

const Root = styled.div`
  height: ${({ theme }) => theme.spacing(12)};
  width: ${({ theme }) => theme.spacing(12)};
  background: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SensorIcon = styled(IconWrapper)`
  width: 1.5em;
  height: 1.5em;
`;
const Label = styled.span`
  font-size: 2.6rem;
`;

const LabelUnit = styled.span`
  font-size: 1rem;
  vertical-align: super;
`;


export default function Sensor(props) {
  const { entityId } = props;
  const { state, icon, unitOfMeasurement } = useEntity(entityId);
  const Icon = getIcon(icon);
  const roundedValue = Math.round(state * 10) / 10;
  const display = roundedValue;

  return (
    <Root>
      <SensorIcon Icon={Icon} />
      <Label>
        {display}
        <LabelUnit>{unitOfMeasurement}</LabelUnit>
      </Label>
    </Root>
  );
}
