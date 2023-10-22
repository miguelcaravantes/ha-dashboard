import React from 'react';
import useEntity, { actionTypes } from '../common/hooks/useEntity';
import {
  Button,
  ListItemSecondaryAction,
  Switch,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Icon from './Icon';

export default function EntityRow(props) {
  const { entityId } = props;
  const { state, name, actionType, toggle, execute, icon } =
    useEntity(entityId);

  const actionMap = new Map([
    [
      actionTypes.Toggle,
      () => (
        <ListItemSecondaryAction>
          <Switch edge="end" onChange={toggle} checked={state === 'on'} />
        </ListItemSecondaryAction>
      ),
    ],
    [actionTypes.Execute, () => <Button onClick={execute}>Execute</Button>],
    [undefined, () => <span>{state}</span>],
  ]);

  const Action = actionMap.get(actionType);

  return (
    <ListItem>
      <ListItemIcon>
        <Icon icon={icon} />
      </ListItemIcon>
      <ListItemText primary={name} />
      <Action />
    </ListItem>
  );
}
