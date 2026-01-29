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

import {
  isString,
  isNumber,
  hasDefault,
} from '../../common/utils/typeGuards.js';

const useConstantHook = hasDefault<unknown>(_useConstant)
  ? _useConstant.default
  : _useConstant;
const awesomeDebounce = hasDefault<unknown>(_AwesomeDebouncePromise)
  ? _AwesomeDebouncePromise.default
  : _AwesomeDebouncePromise;

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
  const rawSupportedColorModes = attributes[SUPPORTED_COLOR_MODES_ATTRIBUTE];
  const supportedColorModes = Array.isArray(rawSupportedColorModes)
    ? rawSupportedColorModes.filter(isString)
    : [];

  const rawBrightness = attributes.brightness;
  const initialBrightness = isNumber(rawBrightness) ? rawBrightness : 0;
  const hassBrightness = useRef(initialBrightness);
  const [brightness, setBrightness] = useState(hassBrightness.current);

  hassBrightness.current = isNumber(attributes.brightness)
    ? attributes.brightness
    : 0;

  useEffect(
    function syncBrightness() {
      if (state && state !== 'unknown') {
        setBrightness(hassBrightness.current);
      }
    },
    [state],
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
    }, 100),
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
    }, 100),
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
