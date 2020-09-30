import { useState, useEffect } from 'react';
import useConstant from 'use-constant';
import useEntity from '../common/hooks/useEntity';
import { useHass } from '../common/hooks/useHass';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import { LIGHT_SUPPORT_COLOR, LIGHT_SUPPORT_BRIGHTNESS } from '../constants';
const useLightDetail = ({ entityId }) => {
  const { callService } = useHass();
  const { stateObj, state, supportedFeatures } = useEntity(entityId);
  const [brightness, setBrightness] = useState(
    stateObj.attributes.brightness ?? 0
  );

  useEffect(() => {
    setBrightness(stateObj.attributes.brightness ?? 0);
    // disabled since it comes from outside react
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const doesSupportColor = Boolean(supportedFeatures & LIGHT_SUPPORT_COLOR);
  const doesSupportBrightness = Boolean(
    supportedFeatures & LIGHT_SUPPORT_BRIGHTNESS
  );

  const updateBrightness = useConstant(() =>
    AwesomeDebouncePromise(async (brightness) => {
      await callService('light', 'turn_on', {
        entity_id: entityId,
        brightness,
      });
    }, 100)
  );
  const updateColor = useConstant(() =>
    AwesomeDebouncePromise(async (color) => {
      const data = {
        entity_id: entityId,
        rgb_color: [color.r, color.g, color.b],
      };
      if (stateObj.state === 'off') {
        data.brightness = 255;
        setBrightness(255);
      }

      await callService('light', 'turn_on', data);
    }, 100)
  );

  const handleBrightnessChange = async (_, newValue) => {
    if (newValue !== brightness) {
      setBrightness(newValue);
      await updateBrightness(newValue);
    }
  };

  const handleColorChange = async (color) => await updateColor(color.rgb);

  return {
    doesSupportColor,
    doesSupportBrightness,
    brightness,
    handleColorChange,
    handleBrightnessChange,
  };
};
export default useLightDetail;
