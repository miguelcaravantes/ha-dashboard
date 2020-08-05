import React from 'react';
import useEntity from '../hooks/useEntity';
import { ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    height: '100px',
    width: '100px',
    background: 'none',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '50%',
  },
  icon: {
    height: '64px',
    width: '64px',
  },
}));

export default function Entity(props) {
  const classes = useStyles();
  const { entityId } = props;
  const { name, toggle, Icon } = useEntity(entityId);

  return (
    <ButtonBase focusRipple className={classes.button} onClick={toggle}>
      <Icon className={classes.icon} />
      {name}
    </ButtonBase>
  );
}
