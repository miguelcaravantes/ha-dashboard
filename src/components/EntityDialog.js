import React from 'react';
import {
  Dialog,
  Toolbar,
  Typography,
  Switch,
  DialogContent as MuiDialogContent,
} from '@material-ui/core';
import LightDetail from './LightDetail';
import useEntity from '../hooks/useEntity';
import styled from 'styled-components';
import FanDetail from './FanDetail';

const Root = styled(Dialog)`
  backdrop-filter: blur(5px);
  & .MuiDialog-paper {
    width: 80%;
    /* padding: ${({ theme }) => theme.spacing(2)}; */
  }
`;

const Title = styled(Typography)`
  margin-left: ${({ theme }) => theme.spacing(2)};
  flex: 1;
`;

const DialogContent = styled(MuiDialogContent)`
  padding: ${({ theme }) => theme.spacing(2)};
`;

export default function EntityDialog(props) {
  const { onClose, open, entityId } = props;
  const { domain, name, state, toggle, isToggleable } = useEntity(entityId);

  let Detail;
  let width = 'xs';
  switch (domain) {
    case 'light':
      Detail = LightDetail;
      width = 'xs';
      break;
    case 'fan':
      Detail = FanDetail;
      width = 'xs';
      break;
    default:
      Detail = null;
  }

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <Root maxWidth={width} onClose={handleClose} open={open}>
      <Toolbar>
        <Title variant="h6">{name}</Title>
        {isToggleable ? (
          <Switch
            checked={state === 'on'}
            onChange={toggle}
            color="primary"
            name="toggle"
          />
        ) : null}
      </Toolbar>
      <DialogContent>
        <Detail entityId={entityId} />
      </DialogContent>
    </Root>
  );
}
