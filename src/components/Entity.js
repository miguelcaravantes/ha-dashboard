import React from 'react';
import useEntity from '../hooks/useEntity';
import { ButtonBase, Badge } from '@material-ui/core';
import { Fan as FanIcon } from 'mdi-material-ui';
import getIcon from './getIcon';
import styled, { keyframes, css } from 'styled-components';

const EntityButton = styled(ButtonBase)`
  height: 100px;
  width: 100px;
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

const IconWrapper = ({ className, Icon }) => <Icon className={className} />;

const fanAnimation = css`
  animation: ${rotate} 1s linear infinite;
`;
const activeEffect = css`
  filter: drop-shadow(0 0 25px #ffffaa);
`;

const ButtonIcon = styled(IconWrapper)`
  height: 64px;
  width: 64px;
  ${({ active }) => (active ? activeEffect : '')};
  ${({ isFan, active }) => (isFan && active ? fanAnimation : '')};
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
      {name}
    </EntityButton>
  );
}
