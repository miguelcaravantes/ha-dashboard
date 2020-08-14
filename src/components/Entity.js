import React, { useState } from 'react';
import useEntity from '../hooks/useEntity';
import { ButtonBase, Badge } from '@material-ui/core';
import styled, { keyframes, css } from 'styled-components';
import Icon from './Icon';
import useLongPress from '../hooks/useLongPres';
import EntityDialog from './EntityDialog';

const Root = styled.div`
  height: ${({ theme }) => theme.spacing(12)};
  width: ${({ theme }) => theme.spacing(12)};
`;
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

const ButtonIcon = styled(({ active, ...props }) => <Icon {...props} />)`
  height: ${({ theme }) => theme.spacing(8)};
  width: ${({ theme }) => theme.spacing(8)};
  ${({ active }) => (active ? activeEffect : '')};
  ${({ icon, active }) => (icon === 'mdi:fan' && active ? fanAnimation : '')};
`;

const Label = styled.span`
  font-size: 1rem;
  font-family: Roboto;
`;

const supportedDetails = ['light', 'fan'];

export default function Entity(props) {
  const { entityId, name: overrideName } = props;
  const {
    name: entityName,
    domain,
    state,
    isGroup,
    groupCount,
    toggle,
    icon,
  } = useEntity(entityId);

  const [modalOpen, setModalOpen] = useState(false);

  const name = overrideName ?? entityName;

  const handleLongPress = () => {
    supportedDetails.includes(domain) && setModalOpen(true);
  };
  const handleModelClose = () => {
    setModalOpen(false);
  };

  const clickHandler = useLongPress(handleLongPress, toggle);

  let buttonIcon = <ButtonIcon icon={icon} active={state === 'on'} />;

  if (isGroup) {
    buttonIcon = (
      <Badge badgeContent={groupCount} color="primary">
        {buttonIcon}
      </Badge>
    );
  }

  return (
    <Root>
      <EntityButton focusRipple {...clickHandler}>
        {buttonIcon}
        <Label>{name}</Label>
      </EntityButton>
      {modalOpen ? (
        <EntityDialog
          entityId={entityId}
          open={modalOpen}
          onClose={handleModelClose}
        />
      ) : null}
    </Root>
  );
}
