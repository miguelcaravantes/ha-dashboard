import React, { useMemo, useState, useCallback } from 'react';
import { styled, keyframes, css as cssSystem } from '@mui/material/styles';
import { Box } from '@mui/material';
import ErrorBoundary from './ErrorBoundary.js';

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
} from '@mui/material/colors';
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

const detailSupported = ['light', 'fan'];

function EntityCardInner({ entityId, title: customTitle, color: colorProp }) {
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
    <Box
      sx={{
        backgroundColor:
          state === 'off'
            ? grey[900]
            : state === 'unavailable'
            ? grey[500]
            : color[500],
        borderRadius: '10px',
        height: (theme) => theme.spacing(12),
        width: '100%',
        maxWidth: (theme) => theme.spacing(25),
        display: 'flex',
        flexDirection: 'column',
        padding: 1.5,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <StyledIcon
          onClick={handleIconClick}
          rotateIcon={state === 'on' && icon === 'mdi:fan'}
          icon={icon}
        />
        {Action && (
          <Box sx={{ ml: 'auto' }}>
            <Action entity={entity} color={color} />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          mt: 'auto',
          pb: '0.2em',
          fontWeight: '700',
          fontSize: '0.8em',
        }}
      >
        <span>{title}</span>
      </Box>
      <EntityDialog
        entityId={entityId}
        open={modalOpen}
        onClose={handleModelClose}
      />
    </Box>
  );
}

function EntityCard(props) {
  return (
    <ErrorBoundary entityId={props.entityId}>
      <EntityCardInner {...props} />
    </ErrorBoundary>
  );
}

export default EntityCard;
