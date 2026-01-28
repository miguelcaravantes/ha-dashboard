import { useState } from 'react';
import useEntity from '../../common/hooks/useEntity.js';
import { Typography, Button } from '@mui/material';
import Icon from '../Icon.js';
import { styled } from '@mui/material/styles';
import EntityDialog from '../EntityDialog.js';
import type { KnownEntityId } from '../../types/entities.js';

const Root = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

function Child({ entityId }: { entityId: string }) {
  const { icon, name } = useEntity(entityId as KnownEntityId);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setModalOpen(true)}>
        <Icon icon={icon} /> {name}
      </Button>
      <EntityDialog
        entityId={entityId as KnownEntityId}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}

export default function LightGroup({ entityId }: { entityId: KnownEntityId }) {
  const { groupEntities } = useEntity(entityId);
  return (
    <Root>
      <Typography variant="h6">Group:</Typography>
      {groupEntities?.map((e) => (
        <Child key={e} entityId={e} />
      ))}
    </Root>
  );
}
