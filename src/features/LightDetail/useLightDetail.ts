import { useState, useEffect, useRef, useTransition } from 'react';
import _useConstant from 'use-constant';
import _AwesomeDebouncePromise from 'awesome-debounce-promise';
import {
  COLOR_MODE_UNKNOWN,
  COLOR_MODE_ONOFF,
  COLOR_MODE_HS,
  COLOR_MODE_XY,
  COLOR_MODE_COLOR_TEMP,
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
  doesSupportColorTemp: boolean;
  doesSupportBrightness: boolean;
  brightness: number;
  colorTemp: number;
  rgbColor: number[] | undefined;
  minMireds: number;
  maxMireds: number;
  handleColorChange: (color: number[]) => void;
  handleBrightnessChange: (newValue: number) => void;
  handleColorTempChange: (newValue: number) => void;
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

  const rawColorTemp = attributes.color_temp;
  const initialColorTemp = isNumber(rawColorTemp)
    ? rawColorTemp
    : attributes.min_mireds || 153;
  const hassColorTemp = useRef(initialColorTemp);
  const [colorTemp, setColorTemp] = useState(hassColorTemp.current);

  hassBrightness.current = isNumber(attributes.brightness)
    ? attributes.brightness
    : 0;

  hassColorTemp.current = isNumber(attributes.color_temp)
    ? attributes.color_temp
    : attributes.min_mireds || 153;

  useEffect(
    function syncState() {
      if (state && state !== 'unknown') {
        setBrightness(hassBrightness.current);
        setColorTemp(hassColorTemp.current);
      }
    },
    [state],
  );

  const doesSupportColor =
    supportedColorModes.includes(COLOR_MODE_HS) ||
    supportedColorModes.includes(COLOR_MODE_XY);
  const doesSupportColorTemp = supportedColorModes.includes(
    COLOR_MODE_COLOR_TEMP,
  );
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

  const updateColorTemp = useConstantHook(() =>
    awesomeDebounce(async (mireds: number) => {
      await callService('light', 'turn_on', {
        entity_id: entityId,
        color_temp: mireds,
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

  const onColorTempChange = (newValue: number) => {
    if (newValue !== colorTemp) {
      setColorTemp(newValue);
      startTransition(async () => {
        await updateColorTemp(newValue);
      });
    }
  };

  return {
    doesSupportColor,
    doesSupportColorTemp,
    doesSupportBrightness,
    brightness,
    colorTemp,
    rgbColor: Array.isArray(attributes.rgb_color)
      ? attributes.rgb_color.filter(isNumber)
      : undefined,
    minMireds: attributes.min_mireds || 153,
    maxMireds: attributes.max_mireds || 500,
    handleColorChange: onColorChange,
    handleBrightnessChange: onBrightnessChange,
    handleColorTempChange: onColorTempChange,
    isPending,
  };
};

export default useLightDetail;
