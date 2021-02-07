import React, { useMemo } from 'react';
import { css, keyframes } from '@emotion/react';
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

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const fanAnimation = css`
  animation: ${rotate} 1s linear infinite;
`;

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

const EntityCard = ({ entityId, color: colorProp }) => {
  const entity = useEntity(entityId);
  const { state, name, domain, icon, openMoreInfo } = entity;
  const color = useMemo(
    () =>
      (entityId && colorProp) ??
      randomColors[Math.floor(Math.random() * randomColors.length)],
    [entityId, colorProp]
  );
  const Action = actions[domain];
  return (
    <div
      css={(theme) => css`
        background-color: ${state === 'off' ? grey[900] : color[500]};
        border-radius: 10px;
        height: ${theme.spacing(12)};
        width: ${theme.spacing(18)};
        display: flex;
        flex-direction: column;
        padding: ${theme.spacing(1.5)};
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: row;
        `}
      >
        <Icon
          onClick={openMoreInfo}
          css={css`
            font-size: 2.5em;
            ${state === 'on' && icon === 'mdi:fan' && fanAnimation}
          `}
          icon={icon}
        />
        {Action && (
          <Action
            css={css`
              margin-left: auto;
            `}
            entity={entity}
            color={color}
          />
        )}
      </div>
      <span
        css={css`
          margin-top: auto;
          padding-bottom: 0.2em;
          font-weight: 700;
          font-size: 0.8em;
        `}
      >
        {name}
      </span>
    </div>
  );
};

export default EntityCard;
