import React from 'react';
import useEntity from '../hooks/useEntity';
import { ButtonBase, Badge } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Fan as FanIcon } from 'mdi-material-ui';

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
  iconActive: {
    filter: 'drop-shadow(0 0 35px #FFFFAA)',
    '&$fan': {
      animation: '$spin 1s linear infinite',
    },
  },
  '@keyframes spin': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
  fan: {},
}));

export default function Entity(props) {
  const classes = useStyles();
  const { entityId } = props;
  const { name, state, isGroup, groupCount, toggle, Icon } = useEntity(
    entityId
  );

  let icon = (
    <Icon
      className={`${classes.icon} ${state === 'on' ? classes.iconActive : ''} ${
        Icon === FanIcon ? classes.fan : ''
      }`}
    />
  );

  if (isGroup) {
    icon = (
      <Badge badgeContent={groupCount} color="primary">
        {icon}
      </Badge>
    );
  }

  return (
    <ButtonBase focusRipple className={classes.button} onClick={toggle}>
      {icon}
      {name}
    </ButtonBase>
  );
}
