import { useState, useEffect, useRef } from 'react';
import useConstant from 'use-constant';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import {
  COLOR_MODE_UNKNOWN,
  COLOR_MODE_ONOFF,
  COLOR_MODE_HS,
  COLOR_MODE_XY,
} from '../../constants';
import useEntity from '../../common/hooks/useEntity';
import { useHass } from '../../common/hooks/useHass';

const SUPPORTED_COLOR_MODES_ATTRIBUTE = 'supported_color_modes';

const useLightDetail = (entityId) => {
  const { callService } = useHass();
  const {
    stateObj,
    state,
    stateObj: {
      attributes: { [SUPPORTED_COLOR_MODES_ATTRIBUTE]: supportedColorModes },
    },
  } = useEntity(entityId);
  const hassBrightness = useRef(stateObj.attributes.brightness ?? 0);
  const [brightness, setBrightness] = useState(hassBrightness.current);
  hassBrightness.current = stateObj.attributes.brightness ?? 0;

  useEffect(
    function syncBrightness() {
      if (state) {
        setBrightness(hassBrightness.current);
      }
    },
    [state]
  );

  console.log(entityId, supportedColorModes);
  const doesSupportColor =
    supportedColorModes.includes(COLOR_MODE_HS) ||
    supportedColorModes.includes(COLOR_MODE_XY);
  const doesSupportBrightness =
    !supportedColorModes.includes(COLOR_MODE_UNKNOWN) &&
    !supportedColorModes.includes(COLOR_MODE_ONOFF);

  const updateBrightness = useConstant(() =>
    AwesomeDebouncePromise(async (brightness) => {
      await callService('light', 'turn_on', {
        entity_id: entityId,
        brightness,
      });
    }, 100)
  );
  const handleColorChange = useConstant(() =>
    AwesomeDebouncePromise(async (color) => {
      const data = {
        entity_id: entityId,
        rgb_color: color,
      };
      if (stateObj.state === 'off') {
        data.brightness = 255;
        setBrightness(255);
      }

      await callService('light', 'turn_on', data);
    }, 100)
  );

  const handleBrightnessChange = (newValue) => {
    if (newValue !== brightness) {
      setBrightness(newValue);
      updateBrightness(newValue);
    }
  };

  return {
    doesSupportColor,
    doesSupportBrightness,
    brightness,
    handleColorChange,
    handleBrightnessChange,
  };
};
export default useLightDetail;
