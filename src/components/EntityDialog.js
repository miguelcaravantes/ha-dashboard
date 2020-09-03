import React from 'react';
import {
  Dialog,
  Toolbar,
  Typography,
  Switch,
  DialogContent as MuiDialogContent,
  IconButton,
} from '@material-ui/core';
import LightDetail from './LightDetail';
import useEntity, { actionTypes } from '../hooks/useEntity';
import styled from 'styled-components';
import FanDetail from './FanDetail';
import { Tune as TuneIcon } from 'mdi-material-ui';

const Root = styled(Dialog)`
  backdrop-filter: blur(5px);
  & .MuiDialog-paper {
    width: 80%;
  }
`;

const Title = styled(Typography)`
  margin-left: ${({ theme }) => theme.spacing(2)};
  flex: 1;
`;

const DialogContent = styled(MuiDialogContent)`
  padding: ${({ theme }) => theme.spacing(2)};
`;

const domainDetailMap = {
  light: LightDetail,
  fan: FanDetail,
};

export default function EntityDialog(props) {
  const { onClose, open, entityId } = props;
  const { domain, name, state, toggle, openMoreInfo, actionType } = useEntity(
    entityId
  );

  const Detail = domainDetailMap[domain];

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <Root maxWidth="xs" onClose={handleClose} open={open}>
      <Toolbar>
        <Title variant="h6">{name}</Title>
        <IconButton onClick={openMoreInfo}>
          <TuneIcon />
        </IconButton>
        {actionType === actionTypes.Toggle ? (
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
