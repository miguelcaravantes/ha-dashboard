import { List, Paper } from '@mui/material';
import { useHass } from '../common/hooks/useHass.js';
import EntityRow from './EntityRow.js';
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
          .filter((key) => !states[key]?.attributes.hidden)
          .map((key) => (
            <EntityRow key={key} entityId={key} />
          ))}
      </List>
    </Root>
  );
}
