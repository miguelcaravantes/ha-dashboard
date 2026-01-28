import useEntity, { ActionType } from '../common/hooks/useEntity.js';
import {
  Button,
  ListItemSecondaryAction,
  Switch,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Icon from './Icon.js';
import type { KnownEntityId } from '../types/entities.js';

interface EntityRowProps {
  entityId: KnownEntityId;
}

export default function EntityRow({ entityId }: EntityRowProps) {
  const { state, name, actionType, toggle, execute, icon } =
    useEntity(entityId);

  const renderAction = () => {
    switch (actionType) {
      case ActionType.Toggle:
        return (
          <ListItemSecondaryAction>
            <Switch edge="end" onChange={toggle} checked={state === 'on'} />
          </ListItemSecondaryAction>
        );
      case ActionType.Execute:
        return <Button onClick={execute}>Execute</Button>;
      default:
        return <span>{state}</span>;
    }
  };

  return (
    <ListItem>
      <ListItemIcon>
        <Icon icon={icon} />
      </ListItemIcon>
      <ListItemText primary={name} />
      {renderAction()}
    </ListItem>
  );
}
