import React from 'react';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import LightbulbGroupIcon from 'mdi-material-ui/LightbulbGroup';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  },
  button: {
    height: '100px',
    width: '100px',
    background: 'none',
    display: 'flex',
    flexDirection: 'column',
  },
  icon:{
    height: '64px',
    width: '64px',
  }
}));

export default function Studio() {
  var classes = useStyles();
  return (
    <Paper className={classes.root}>
      <ButtonBase focusRipple className={classes.button}>
        <LightbulbGroupIcon  className={classes.icon}/>
        Luces
      </ButtonBase>
    </Paper>
  );
}
