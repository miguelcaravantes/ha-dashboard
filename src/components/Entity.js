import React from 'react';
import useEntity from '../hooks/useEntity';
import { ButtonBase, Badge } from '@material-ui/core';
import { Fan as FanIcon } from 'mdi-material-ui';
import getIcon from './getIcon';
import styled, { keyframes, css } from 'styled-components';
import IconWrapper from './IconWrapper';

const EntityButton = styled(ButtonBase)`
  height: ${({ theme }) => theme.spacing(12)};
  width: ${({ theme }) => theme.spacing(12)};
  background: none;
  display: flex;
  flex-direction: column;
  border-radius: 100%;
  justify-content: start;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const fanAnimation = css`
  animation: ${rotate} 1s linear infinite;
`;
const activeEffect = css`
  filter: drop-shadow(0 0 25px #ffffaa);
`;

const ButtonIcon = styled(IconWrapper)`
  height: ${({ theme }) => theme.spacing(8)};
  width: ${({ theme }) => theme.spacing(8)};
  ${({ active }) => (active ? activeEffect : '')};
  ${({ isFan, active }) => (isFan && active ? fanAnimation : '')};
`;

const Label = styled.span`
  font-size: 16px;
  font-family: Roboto;
`;

export default function Entity(props) {
  const { entityId, name: overrideName } = props;
  const {
    name: entityName,
    state,
    isGroup,
    groupCount,
    toggle,
    icon,
  } = useEntity(entityId);

  const name = overrideName ?? entityName;

  const Icon = getIcon(icon);

  let buttonIcon = (
    <ButtonIcon Icon={Icon} active={state === 'on'} isFan={Icon === FanIcon} />
  );

  if (isGroup) {
    buttonIcon = (
      <Badge badgeContent={groupCount} color="primary">
        {buttonIcon}
      </Badge>
    );
  }

  return (
    <EntityButton focusRipple onClick={toggle}>
      {buttonIcon}
      <Label>{name}</Label>
    </EntityButton>
  );
}
