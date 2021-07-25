import { useState, useEffect } from 'react';
import useConstant from 'use-constant';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import {
  COLOR_MODE_UNKNOWN,
  COLOR_MODE_ONOFF,
  COLOR_MODE_HS,
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
  const [brightness, setBrightness] = useState(
    stateObj.attributes.brightness ?? 0
  );

  useEffect(() => {
    setBrightness(stateObj.attributes.brightness ?? 0);
    // disabled since it comes from outside react
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const doesSupportColor = supportedColorModes.includes(COLOR_MODE_HS);
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

  const handleBrightnessChange = async (newValue) => {
    if (newValue !== brightness) {
      setBrightness(newValue);
      await updateBrightness(newValue);
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
