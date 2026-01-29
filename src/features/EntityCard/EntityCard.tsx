import { useMemo, useState, useCallback } from 'react';
import type { ComponentType } from 'react';

import { Card } from '@/components/ui/card.js';
import { Skeleton } from '@/components/ui/skeleton.js';
import { cn } from '@/lib/utils.js';
import ErrorBoundary from './ErrorBoundary.js';
import Icon from '../Icon.js';
import useEntity from '../../common/hooks/useEntity.js';
import type { UseEntityResult } from '../../common/hooks/useEntity.js';
import PowerSwitch from './PowerSwitch.js';
import { FAN, LIGHT, SENSOR, SWITCH } from '../../common/domains.js';
import SensorDisplay from './SensorDisplay.js';
import EntityDialog from '../EntityDialog.js';
import type { KnownEntityId } from '../../types/entities.js';

interface StyledIconProps {
  rotateIcon?: boolean;
  icon?: string | undefined;
  onClick?: () => void;
  className?: string;
}

const StyledIcon = (props: StyledIconProps) => {
  const { rotateIcon, className, ...iconProps } = props;
  return (
    <div
      className={cn(
        'flex items-center justify-center transition-transform duration-300 group-hover:scale-110',
        rotateIcon && 'animate-spin [animation-duration:1s]',
        className,
      )}
    >
      <Icon size="2.5rem" {...iconProps} />
    </div>
  );
};

interface ActionProps {
  entity: UseEntityResult;
  color: string;
  className?: string;
}

const actions: Record<string, ComponentType<ActionProps>> = {
  [LIGHT]: PowerSwitch,
  [SWITCH]: PowerSwitch,
  [FAN]: PowerSwitch,
  [SENSOR]: SensorDisplay,
};

const randomColors: string[] = [
  '#f44336', // red
  '#9c27b0', // purple
  '#673ab7', // deepPurple
  '#3f51b5', // indigo
  '#00bcd4', // cyan
  '#009688', // teal
  '#4caf50', // green
  '#ff5722', // deepOrange
];

const detailSupported = ['light', 'fan'];

interface EntityCardProps {
  entityId: KnownEntityId;
  title?: string;
  color?: string;
}

function EntityCardInner({
  entityId,
  title: customTitle,
  color: colorProp,
}: EntityCardProps) {
  const entity = useEntity(entityId);
  const { state, name, domain, icon, openMoreInfo, stateObj } = entity;
  const [modalOpen, setModalOpen] = useState(false);
  const title = customTitle || name;
  const color = useMemo(() => {
    if (entityId && colorProp) return colorProp;
    const randomColor =
      randomColors[Math.floor(Math.random() * randomColors.length)];
    return randomColor || '#9e9e9e'; // grey
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

  if (!stateObj) {
    return (
      <Card className="flex h-32 w-full min-w-40 max-w-64 flex-col p-3 border border-border/50 bg-card/50 shadow-sm animate-pulse">
        <div className="flex flex-row items-start justify-between">
          <Skeleton className="h-10 w-10 rounded-full bg-white/10" />
          <Skeleton className="h-8 w-12 bg-white/10" />
        </div>
        <Skeleton className="mt-auto h-4 w-3/4 bg-white/10" />
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        'group relative flex h-32 w-full min-w-40 max-w-64 flex-col p-3 transition-all duration-300 select-none cursor-pointer shadow-md',
        'border border-[var(--ha-card-border-color,var(--divider-color,transparent))]',
        'hover:brightness-110 hover:shadow-lg active:scale-[0.98] active:duration-75',
        '@[container]',
      )}
      style={{
        backgroundColor:
          state === 'off'
            ? 'var(--ha-card-background, var(--card-background-color, #1c1c1c))'
            : state === 'unavailable'
              ? 'var(--disabled-text-color, #727272)'
              : color,
        color: state === 'off' ? 'var(--primary-text-color)' : '#fff',
      }}
      onClick={handleIconClick}
    >
      <div className="flex flex-row items-start justify-between">
        <StyledIcon
          rotateIcon={state === 'on' && icon === 'mdi:fan'}
          icon={icon}
        />
        {Action && (
          <div
            className="action-container ml-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Action entity={entity} color={color} />
          </div>
        )}
      </div>

      <div className="entity-title mt-auto pb-1 text-[0.9em] font-bold leading-tight tracking-tight @[max-width:150px]:text-[0.7em] @[min-width:300px]:text-[1em]">
        <span className="truncate opacity-90 group-hover:opacity-100 transition-opacity">
          {title}
        </span>
      </div>

      <EntityDialog
        entityId={entityId}
        open={modalOpen}
        onClose={handleModelClose}
      />
    </Card>
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
