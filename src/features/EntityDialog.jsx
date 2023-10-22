import React from 'react';
import {
  Dialog,
  Toolbar,
  Typography,
  Switch,
  DialogContent as MuiDialogContent,
  IconButton,
} from '@mui/material';

import useEntity, { actionTypes } from '../common/hooks/useEntity';
import { styled } from '@mui/material/styles';
import FanDetail from './FanDetail';
import { Tune as TuneIcon } from 'mdi-material-ui';
import LightDetail from './LightDetail/LightDetail';

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

const DialogToolbar = ({ title, onMoreClick, showToggle, state, onToggle }) => (
  <Toolbar>
    <Title variant="h6">{title}</Title>
    <IconButton onClick={onMoreClick}>
      <TuneIcon />
    </IconButton>
    {showToggle && (
      <Switch checked={state === 'on'} onChange={onToggle} color="primary" />
    )}
  </Toolbar>
);

export default function EntityDialog(props) {
  const { onClose, open, entityId } = props;
  const { domain, name, state, toggle, openMoreInfo, actionType } =
    useEntity(entityId);

  const Detail = domainDetailMap[domain];

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <Root maxWidth="xs" onClose={handleClose} open={open}>
      <DialogToolbar
        showToggle={actionType === actionTypes.Toggle}
        onMoreClick={openMoreInfo}
        title={name}
        state={state}
        onToggle={toggle}
      />
      {open && (
        <DialogContent>
          <Detail entityId={entityId} />
        </DialogContent>
      )}
    </Root>
  );
}
