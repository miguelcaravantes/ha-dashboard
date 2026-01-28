import { useState, useEffect, useRef, useTransition } from 'react';
import _useConstant from 'use-constant';
import _AwesomeDebouncePromise from 'awesome-debounce-promise';
import {
  COLOR_MODE_UNKNOWN,
  COLOR_MODE_ONOFF,
  COLOR_MODE_HS,
  COLOR_MODE_XY,
} from '../../constants.js';
import useEntity from '../../common/hooks/useEntity.js';
import { useHass } from '../../common/hooks/useHass.js';
import type { KnownEntityId } from '../../types/entities.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
const useConstantHook = (_useConstant as any).default || _useConstant;
const awesomeDebounce =
  (_AwesomeDebouncePromise as any).default || _AwesomeDebouncePromise;
/* eslint-enable @typescript-eslint/no-explicit-any */

const SUPPORTED_COLOR_MODES_ATTRIBUTE = 'supported_color_modes';

export interface UseLightDetailResult {
  doesSupportColor: boolean;
  doesSupportBrightness: boolean;
  brightness: number;
  handleColorChange: (color: number[]) => void;
  handleBrightnessChange: (newValue: number) => void;
  isPending: boolean;
}

const useLightDetail = (entityId: KnownEntityId): UseLightDetailResult => {
  const { callService } = useHass();
  const { stateObj, state } = useEntity(entityId);
  const [isPending, startTransition] = useTransition();

  const attributes = stateObj?.attributes || {};
  const supportedColorModes =
    (attributes[SUPPORTED_COLOR_MODES_ATTRIBUTE] as string[]) || [];

  const hassBrightness = useRef((attributes.brightness as number) ?? 0);
  const [brightness, setBrightness] = useState(hassBrightness.current);

  hassBrightness.current = (attributes.brightness as number) ?? 0;

  useEffect(
    function syncBrightness() {
      if (state && state !== 'unknown') {
        setBrightness(hassBrightness.current);
      }
    },
    [state]
  );

  const doesSupportColor =
    supportedColorModes.includes(COLOR_MODE_HS) ||
    supportedColorModes.includes(COLOR_MODE_XY);
  const doesSupportBrightness =
    !supportedColorModes.includes(COLOR_MODE_UNKNOWN) &&
    !supportedColorModes.includes(COLOR_MODE_ONOFF);

  const updateBrightness = useConstantHook(() =>
    awesomeDebounce(async (brightnessValue: number) => {
      await callService('light', 'turn_on', {
        entity_id: entityId,
        brightness: brightnessValue,
      });
    }, 100)
  );

  const handleColorChange = useConstantHook(() =>
    awesomeDebounce(async (color: number[]) => {
      const data: Record<string, unknown> = {
        entity_id: entityId,
        rgb_color: color,
      };
      if (stateObj?.state === 'off') {
        data['brightness'] = 255;
        setBrightness(255);
      }

      await callService('light', 'turn_on', data);
    }, 100)
  );

  const onColorChange = (color: number[]) => {
    startTransition(async () => {
      await handleColorChange(color);
    });
  };

  const onBrightnessChange = (newValue: number) => {
    if (newValue !== brightness) {
      setBrightness(newValue);
      startTransition(async () => {
        await updateBrightness(newValue);
      });
    }
  };

  return {
    doesSupportColor,
    doesSupportBrightness,
    brightness,
    handleColorChange: onColorChange,
    handleBrightnessChange: onBrightnessChange,
    isPending,
  };
};

export default useLightDetail;
