import { useMemo, useState, useCallback } from "react";
import type { ComponentType } from "react";
import { type Color } from "@mui/material";
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
} from "@mui/material/colors";

import { Card } from "@/components/ui/card.js";
import { cn } from "@/lib/utils.js";
import ErrorBoundary from "./ErrorBoundary.js";
import Icon from "../Icon.js";
import useEntity from "../../common/hooks/useEntity.js";
import type { UseEntityResult } from "../../common/hooks/useEntity.js";
import PowerSwitch from "./PowerSwitch.js";
import { FAN, LIGHT, SENSOR, SWITCH } from "../../common/domains.js";
import SensorDisplay from "./SensorDisplay.js";
import EntityDialog from "../EntityDialog.js";
import type { KnownEntityId } from "../../types/entities.js";

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
        "text-[2.5em] flex items-center justify-center",
        rotateIcon && "animate-spin [animation-duration:1s]",
        className,
      )}
    >
      <Icon {...iconProps} />
    </div>
  );
};

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

const detailSupported = ["light", "fan"];

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
    <Card
      className={cn(
        "group relative flex h-32 w-full min-w-40 max-w-64 flex-col p-3 transition-all duration-200 select-none cursor-pointer border-none shadow-md",
        "hover:brightness-110 active:scale-[0.98]",
        "@container",
      )}
      style={{
        backgroundColor:
          state === "off"
            ? grey[900]
            : state === "unavailable"
              ? grey[500]
              : color[500],
        color: "#fff",
      }}
      onClick={handleIconClick}
    >
      <div className="flex flex-row items-start justify-between">
        <StyledIcon
          rotateIcon={state === "on" && icon === "mdi:fan"}
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

      <div className="entity-title mt-auto pb-1 text-[0.8em] font-bold leading-tight @[max-width:150px]:text-[0.7em] @[min-width:300px]:text-[1em]">
        <span className="truncate">{title}</span>
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
