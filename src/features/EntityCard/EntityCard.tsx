import { useMemo, useState, useCallback } from 'react';
import type { ComponentType } from 'react';
import { styled, keyframes, css as cssSystem } from '@mui/material/styles';
import { Box, type Color } from '@mui/material';
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
import Icon from '../Icon.js';
import useEntity from '../../common/hooks/useEntity.js';
import type { UseEntityResult } from '../../common/hooks/useEntity.js';
import PowerSwitch from './PowerSwitch.js';
import { FAN, LIGHT, SENSOR, SWITCH } from '../../common/domains.js';
import SensorDisplay from './SensorDisplay.js';
import EntityDialog from '../EntityDialog.js';
import type { KnownEntityId } from '../../types/entities.js';

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

interface StyledIconProps {
  rotateIcon?: boolean;
  icon?: string | undefined;
  onClick?: () => void;
}

const StyledIcon = styled((props: StyledIconProps) => {
  const { rotateIcon: _, ...iconProps } = props;
  return <Icon {...iconProps} />;
})<StyledIconProps>(
  {
    fontSize: '2.5em',
  },
  ({ rotateIcon }) => (rotateIcon ? fanAnimation : undefined),
);

interface ActionProps {
  entity: UseEntityResult;
  color: Color;
  className?: string;
}

const actions: Record<string, ComponentType<ActionProps>> = {
  [LIGHT]: PowerSwitch,
  [SWITCH]: PowerSwitch,
  [FAN]: PowerSwitch,
  [SENSOR]: SensorDisplay,
};

const randomColors: Color[] = [
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

interface EntityCardProps {
  entityId: KnownEntityId;
  title?: string;
  color?: Color;
}

function EntityCardInner({
  entityId,
  title: customTitle,
  color: colorProp,
}: EntityCardProps) {
  const entity = useEntity(entityId);
  const { state, name, domain, icon, openMoreInfo } = entity;
  const [modalOpen, setModalOpen] = useState(false);
  const title = customTitle || name;
  const color = useMemo(() => {
    if (entityId && colorProp) return colorProp;
    const randomColor =
      randomColors[Math.floor(Math.random() * randomColors.length)];
    return randomColor || grey;
  }, [entityId, colorProp]);

  const handleIconClick = useCallback(
    () =>
      detailSupported.includes(domain) ? setModalOpen(true) : openMoreInfo(),
    [domain, openMoreInfo],
  );

  const handleModelClose = useCallback(
    () => setModalOpen(false),
    [setModalOpen],
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
        color: '#fff',
        containerType: 'inline-size',
        '@container (max-width: 150px)': {
          padding: 1,
          '& .entity-title': {
            fontSize: '0.7em',
          },
          '& .action-container': {
            display: 'none',
          },
        },
        '@container (min-width: 300px)': {
          padding: 2,
          '& .entity-title': {
            fontSize: '1em',
          },
        },
      }}
    >
      <Box
        className="header-container"
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
          <Box className="action-container" sx={{ ml: 'auto' }}>
            <Action entity={entity} color={color} />
          </Box>
        )}
      </Box>
      <Box
        className="entity-title"
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

function EntityCard(props: EntityCardProps) {
  return (
    <ErrorBoundary entityId={props.entityId}>
      <EntityCardInner {...props} />
    </ErrorBoundary>
  );
}

export default EntityCard;
