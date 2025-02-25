import { List, Paper } from '@mui/material';

import { useHass } from '../common/hooks/useHass';
import EntityRow from './EntityRow';
import { styled } from '@mui/material/styles';

const Root = styled(Paper)({
  width: '100%',
});

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
