import React, { useMemo, useState, useCallback } from 'react';
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
import EntityDialog from '../EntityDialog';

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

  const handleIconClick = useCallback(
    () =>
      detailSupported.includes(domain) ? setModalOpen(true) : openMoreInfo(),
    [domain, openMoreInfo]
  );

  const handleModelClose = useCallback(() => setModalOpen(false), [
    setModalOpen,
  ]);

  const Action = actions[domain];
  return (
    <div
      css={(theme) => css`
        background-color: ${state === 'off' ? grey[900] : color[500]};
        border-radius: 10px;
        height: ${theme.spacing(12)};
        width: 100%;
        max-width: ${theme.spacing(25)};
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
          onClick={handleIconClick}
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
        {title}
      </span>
      <EntityDialog
        entityId={entityId}
        open={modalOpen}
        onClose={handleModelClose}
      />
    </div>
  );
};

export default EntityCard;
