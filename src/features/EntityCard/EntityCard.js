import React, { useMemo, useState, useCallback } from 'react';
import { styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { keyframes, css as cssSystem } from '@material-ui/system';
import {
  red,
  purple,
  deepPurple,
  indigo,
  cyan,
  teal,
  green,
  deepOrange,
  grey,
} from '@material-ui/core/colors';
import Icon from '../Icon';
import useEntity from '../../common/hooks/useEntity';
import PowerSwitch from './PowerSwitch';
import { FAN, LIGHT, SENSOR, SWITCH } from '../../common/domains';
import SensorDisplay from './SensorDisplay';
import EntityDialog from '../EntityDialog';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const fanAnimation = cssSystem`
  animation: ${rotate} 1s linear infinite;
`;

const StyledIcon = styled(({ rotateIcon: _, ...props }) => <Icon {...props} />)(
  {
    fontSize: '2.5em',
  },
  ({ rotateIcon }) => (rotateIcon ? fanAnimation : undefined)
);

const actions = {
  [LIGHT]: PowerSwitch,
  [SWITCH]: PowerSwitch,
  [FAN]: PowerSwitch,
  [SENSOR]: SensorDisplay,
};

const randomColors = [
  red,
  purple,
  deepPurple,
  indigo,
  cyan,
  teal,
  green,
  deepOrange,
];

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: ({ state, color }) =>
      state === 'off'
        ? grey[900]
        : state === 'unavailable'
        ? grey[500]
        : color[500],
    borderRadius: '10px',
    height: theme.spacing(12),
    width: '100%',
    maxWidth: theme.spacing(25),
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1.5),
  },
  flexContanier: {
    display: 'flex',
    flexDirection: 'row',
  },
  action: {
    marginLeft: 'auto',
  },
  title: {
    marginTop: 'auto',
    paddingBottom: '0.2em',
    fontWeight: '700',
    fontSize: '0.8em',
  },
}));

const detailSupported = ['light', 'fan'];
const EntityCard = ({ entityId, title: customTitle, color: colorProp }) => {
  const entity = useEntity(entityId);
  const { state, name, domain, icon, openMoreInfo } = entity;
  const [modalOpen, setModalOpen] = useState(false);
  const title = customTitle || name;
  const color = useMemo(
    () =>
      (entityId && colorProp) ??
      randomColors[Math.floor(Math.random() * randomColors.length)],
    [entityId, colorProp]
  );

  const classes = useStyles({ state, color });
  const handleIconClick = useCallback(
    () =>
      detailSupported.includes(domain) ? setModalOpen(true) : openMoreInfo(),
    [domain, openMoreInfo]
  );

  const handleModelClose = useCallback(
    () => setModalOpen(false),
    [setModalOpen]
  );

  const Action = actions[domain];
  return (
    <div className={classes.root}>
      <div className={classes.flexContanier}>
        <StyledIcon
          onClick={handleIconClick}
          rotateIcon={state === 'on' && icon === 'mdi:fan'}
          icon={icon}
        />
        {Action && (
          <Action className={classes.action} entity={entity} color={color} />
        )}
      </div>
      <span className={classes.title}>{title}</span>
      <EntityDialog
        entityId={entityId}
        open={modalOpen}
        onClose={handleModelClose}
      />
    </div>
  );
};

export default EntityCard;
