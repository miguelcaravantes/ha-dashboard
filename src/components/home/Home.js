import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import Studio from './Studio';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Home(props) {
  const classes = useStyles();

  const handleNightMode = () => {
    props.hass.callService('script', 'night_mode');
  };

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Paper className={classes.control}>
          <Grid container>
            <Grid item>
              <Tooltip title="Mode Noche">
                <IconButton onClick={handleNightMode}>
                  <NightsStayIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>

            <Studio />

      </Grid>
    </Grid>
  );
}
