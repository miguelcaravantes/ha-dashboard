import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import EntityIcon from './EntityIcon';
import useEntity from '../../hooks/useEntity';
import Button from '@material-ui/core/Button';

export default function EntityRow(props) {
  const { entityId } = props;
  const { stateObj, isToggleable, isExecutable, toggle, execute } = useEntity(entityId);

  const handleToggle = () => toggle();
  const handleExecute = () => execute();


  let action;
  if (isToggleable) {
    action = (
      <ListItemSecondaryAction>
        <Switch
          edge="end"
          onChange={handleToggle}
          checked={stateObj.state === 'on'}
        />
      </ListItemSecondaryAction>
    );
  } else if (isExecutable) {
    action = <Button onClick={handleExecute}>Execute</Button>;
  } else {
    action = <span>{stateObj.state}</span>;
  }

  return (
    <ListItem >
      <ListItemIcon>
        <EntityIcon entityId={entityId} />
      </ListItemIcon>
      <ListItemText primary={stateObj.attributes.friendly_name} />
       { action }
    </ListItem>
  );
}
