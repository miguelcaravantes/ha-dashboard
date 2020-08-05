import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import useEntity from '../hooks/useEntity';
import getIcon from './getIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100px',
    width: '100px',
    background: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '1.5em',
    height: '1.5em',
  },
  label: {
    fontSize: '2.6rem',
  },
  labelUnit: {
    fontSize: '1rem',
    verticalAlign: 'super'
  },
}));

export default function Sensor(props) {
  const { entityId } = props;
  const { state, icon, unitOfMeasurement } = useEntity(entityId);
  const Icon = getIcon(icon);
  const classes = useStyles();
  const roundedValue = Math.round(state * 10) / 10;
  const display = roundedValue;


  return (
    <div className={classes.root}>
      <Icon className={classes.icon} />
      <span className={classes.label}>
        {display}
        <span className={classes.labelUnit}>{unitOfMeasurement}</span>
      </span>
    </div>
  );
}
