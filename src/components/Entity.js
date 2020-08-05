import React from 'react';
import useEntity from '../hooks/useEntity';
import { ButtonBase, Badge } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Fan as FanIcon } from 'mdi-material-ui';
import getIcon from './getIcon';

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
  const { name, state, isGroup, groupCount, toggle, icon } = useEntity(
    entityId
  );

  const Icon = getIcon(icon);

  let buttonIcon = (
    <Icon
      className={`${classes.icon} ${state === 'on' ? classes.iconActive : ''} ${
        Icon === FanIcon ? classes.fan : ''
      }`}
    />
  );

  if (isGroup) {
    buttonIcon = (
      <Badge badgeContent={groupCount} color="primary">
        {buttonIcon}
      </Badge>
    );
  }

  return (
    <ButtonBase focusRipple className={classes.button} onClick={toggle}>
      {buttonIcon}
      {name}
    </ButtonBase>
  );
}
