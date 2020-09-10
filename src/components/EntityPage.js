import React from 'react';
import { List, Paper } from '@material-ui/core';

import { useHass } from '../common/hooks/useHass';
import EntityRow from './EntityRow';
import styled from 'styled-components';

const Root = styled(Paper)`
  width: 100%;
`;

export default function EntityPage() {
  const { states } = useHass();
  return (
    <Root>
      <List component="nav" aria-label="main mailbox folders">
        {Object.keys(states)
          .filter((key) => !states[key].attributes.hidden)
          .map((key) => (
            <EntityRow key={key} entityId={key} />
          ))}
      </List>
    </Root>
  );
}
