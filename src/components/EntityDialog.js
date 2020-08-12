import React from 'react';
import { Dialog } from '@material-ui/core';
import LightDetail from './LightDetail';
import useEntity from '../hooks/useEntity';
import styled from 'styled-components';
import FanDetail from './FanDetail';

const Root = styled(Dialog)`
  backdrop-filter: blur(5px);
  & .MuiDialog-paper {
    width: 80%;
    padding: ${({ theme }) => theme.spacing(2)};
  }
`;

export default function EntityDialog(props) {
  const { onClose, open, entityId } = props;
  const { domain } = useEntity(entityId);

  let Detail;
  switch (domain) {
    case 'light':
      Detail = LightDetail;
      break;
    case 'fan':
      Detail = FanDetail;
      break;
    default:
      Detail = null;
  }

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <Root onClose={handleClose} open={open}>
      <Detail entityId={entityId} />
    </Root>
  );
}
