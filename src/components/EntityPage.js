import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';

import { useHass } from '../hooks/useHass';
import EntityRow from './shared/EntityRow';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    color: 'white',
  },
}));

export default function EntityPage() {
  const classes = useStyles();
  const { states } = useHass();
  return (
    <Paper className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {Object.keys(states)
          .filter((key) => !states[key].attributes.hidden)
          .map((key) => (
            <EntityRow key={key} entityId={key} />
          ))}
      </List>
    </Paper>
  );
}
