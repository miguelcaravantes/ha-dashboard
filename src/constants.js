const FAN_SUPPORT_SET_SPEED = 1;
const FAN_SUPPORT_OSCILLATE = 2;
const FAN_SUPPORT_DIRECTION = 4;

// Possible color modes
const COLOR_MODE_UNKNOWN = 'unknown'; // Ambiguous color mode
const COLOR_MODE_ONOFF = 'onoff'; // Must be the only supported mode
const COLOR_MODE_BRIGHTNESS = 'brightness'; // Must be the only supported mode
const COLOR_MODE_COLOR_TEMP = 'color_temp';
const COLOR_MODE_HS = 'hs';
const COLOR_MODE_XY = 'xy';
const COLOR_MODE_RGB = 'rgb';
const COLOR_MODE_RGBW = 'rgbw';
const COLOR_MODE_RGBWW = 'rgbww';

export {
  FAN_SUPPORT_SET_SPEED,
  FAN_SUPPORT_OSCILLATE,
  FAN_SUPPORT_DIRECTION,
  COLOR_MODE_UNKNOWN,
  COLOR_MODE_ONOFF,
  COLOR_MODE_BRIGHTNESS,
  COLOR_MODE_COLOR_TEMP,
  COLOR_MODE_HS,
  COLOR_MODE_XY,
  COLOR_MODE_RGB,
  COLOR_MODE_RGBW,
  COLOR_MODE_RGBWW,
};
