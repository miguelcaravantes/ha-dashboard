import { useState, useTransition } from 'react';
import { styled } from '@mui/material/styles';
import { Slider, Switch, Typography, Box } from '@mui/material';
import useEntity from '../common/hooks/useEntity.js';
import { useHass } from '../common/hooks/useHass.js';
import { FAN_SUPPORT_SET_SPEED, FAN_SUPPORT_OSCILLATE } from '../constants.js';
import _AwesomeDebouncePromise from 'awesome-debounce-promise';
import _useConstant from 'use-constant';
import type { KnownEntityId } from '../types/entities.js';

import { isNumber, hasDefault } from '../common/utils/typeGuards.js';

const awesomeDebounce = hasDefault<unknown>(_AwesomeDebouncePromise)
  ? _AwesomeDebouncePromise.default
  : _AwesomeDebouncePromise;
const useConstantHook = hasDefault<unknown>(_useConstant)
  ? _useConstant.default
  : _useConstant;

const Root = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

interface FanDetailProps {
  entityId: KnownEntityId;
}

export default function FanDetail({ entityId }: FanDetailProps) {
  const { callService } = useHass();
  const { stateObj, supportedFeatures } = useEntity(entityId);
  const [isPending, startTransition] = useTransition();

  const attributes = stateObj?.attributes || {};
  const oscillating =
    typeof attributes.oscillating === 'boolean'
      ? attributes.oscillating
      : undefined;
  const percentageStep = isNumber(attributes.percentage_step)
    ? attributes.percentage_step
    : undefined;
  const percentage = isNumber(attributes.percentage)
    ? attributes.percentage
    : undefined;

  const [localPercentage, setLocalPercentage] = useState(percentage ?? 0);

  const doesSupportSpeed = Boolean(
    (supportedFeatures ?? 0) & FAN_SUPPORT_SET_SPEED,
  );
  const doesSupportOscillate = Boolean(
    (supportedFeatures ?? 0) & FAN_SUPPORT_OSCILLATE,
  );

  const handleChangeOscillation = () => {
    startTransition(async () => {
      await callService('fan', 'oscillate', {
        entity_id: entityId,
        oscillating: !oscillating,
      });
    });
  };

  const updatePercentage = useConstantHook(() =>
    awesomeDebounce(async (percentageValue: number) => {
      await callService('fan', 'set_percentage', {
        entity_id: entityId,
        percentage: percentageValue,
      });
    }, 100),
  );

  const handleSpeedChange = (value: number) => {
    setLocalPercentage(value);
    startTransition(async () => {
      await updatePercentage(value);
    });
  };

  return (
    <Root sx={{ opacity: isPending ? 0.7 : 1 }}>
      {doesSupportOscillate && (
        <>
          <Typography variant="h6">Oscillate:</Typography>
          <Switch
            checked={oscillating ?? false}
            onChange={handleChangeOscillation}
            disabled={isPending}
          />
        </>
      )}
      {doesSupportSpeed && (
        <>
          <Typography variant="h6">Speed:</Typography>
          <Box sx={{ px: 3, width: '100%' }}>
            <Slider
              min={0}
              max={100}
              step={percentageStep ?? 1}
              value={localPercentage}
              valueLabelDisplay="auto"
              onChange={(_e, value) => {
                if (isNumber(value)) {
                  handleSpeedChange(value);
                }
              }}
              disabled={isPending}
            />
          </Box>
        </>
      )}
    </Root>
  );
}
