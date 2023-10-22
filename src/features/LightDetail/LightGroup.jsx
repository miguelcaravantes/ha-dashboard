import { useState } from 'react';
import useEntity from '../../common/hooks/useEntity';
import { Typography, Button } from '@mui/material';
import Icon from '../Icon';
import { styled } from '@mui/material/styles';
import EntityDialog from '../EntityDialog';

const Root = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

function Child({ entityId }) {
  const { icon, name } = useEntity(entityId);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setModalOpen(true)}>
        <Icon icon={icon} /> {name}
      </Button>
      <EntityDialog
        entityId={entityId}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}

export default function LightGroup({ entityId }) {
  const { groupEntities } = useEntity(entityId);
  return (
    <Root>
      <Typography variant="h6">Group:</Typography>
      {groupEntities.map((e) => (
        <Child key={e} entityId={e} />
      ))}
    </Root>
  );
}
