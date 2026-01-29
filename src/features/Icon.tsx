import MdiIcon from '@mdi/react';
import * as mdi from '@mdi/js';
import type { SVGProps } from 'react';

const hassMappings: Record<string, string> = {
  'mdi:access-point-network': mdi.mdiAccessPointNetwork,
  'mdi:account': mdi.mdiAccount,
  'mdi:air-filter': mdi.mdiAirFilter,
  'mdi:alarm': mdi.mdiAlarm,
  'mdi:battery': mdi.mdiBattery,
  'mdi:battery-10': mdi.mdiBattery10,
  'mdi:battery-20': mdi.mdiBattery20,
  'mdi:battery-30': mdi.mdiBattery30,
  'mdi:battery-40': mdi.mdiBattery40,
  'mdi:battery-50': mdi.mdiBattery50,
  'mdi:battery-60': mdi.mdiBattery60,
  'mdi:battery-70': mdi.mdiBattery70,
  'mdi:battery-80': mdi.mdiBattery80,
  'mdi:battery-90': mdi.mdiBattery90,
  'mdi:battery-charging': mdi.mdiBatteryCharging,
  'mdi:battery-charging-10': mdi.mdiBatteryCharging10,
  'mdi:battery-charging-20': mdi.mdiBatteryCharging20,
  'mdi:battery-charging-30': mdi.mdiBatteryCharging30,
  'mdi:battery-charging-40': mdi.mdiBatteryCharging40,
  'mdi:battery-charging-50': mdi.mdiBatteryCharging50,
  'mdi:battery-charging-60': mdi.mdiBatteryCharging60,
  'mdi:battery-charging-70': mdi.mdiBatteryCharging70,
  'mdi:battery-charging-80': mdi.mdiBatteryCharging80,
  'mdi:battery-charging-90': mdi.mdiBatteryCharging90,
  'mdi:battery-charging-wireless': mdi.mdiBatteryChargingWireless,
  'mdi:battery-charging-wireless-10': mdi.mdiBatteryChargingWireless10,
  'mdi:battery-charging-wireless-20': mdi.mdiBatteryChargingWireless20,
  'mdi:battery-charging-wireless-30': mdi.mdiBatteryChargingWireless30,
  'mdi:battery-charging-wireless-40': mdi.mdiBatteryChargingWireless40,
  'mdi:battery-charging-wireless-50': mdi.mdiBatteryChargingWireless50,
  'mdi:battery-charging-wireless-60': mdi.mdiBatteryChargingWireless60,
  'mdi:battery-charging-wireless-70': mdi.mdiBatteryChargingWireless70,
  'mdi:battery-charging-wireless-80': mdi.mdiBatteryChargingWireless80,
  'mdi:battery-charging-wireless-90': mdi.mdiBatteryChargingWireless90,
  'mdi:battery-heart-variant': mdi.mdiBatteryHeartVariant,
  'mdi:battery-minus': mdi.mdiBatteryMinus,
  'mdi:battery-plus': mdi.mdiBatteryPlus,
  'mdi:bluetooth': mdi.mdiBluetooth,
  'mdi:brightness-1': mdi.mdiBrightness1,
  'mdi:brightness-2': mdi.mdiBrightness2,
  'mdi:brightness-3': mdi.mdiBrightness3,
  'mdi:brightness-4': mdi.mdiBrightness4,
  'mdi:brightness-5': mdi.mdiBrightness5,
  'mdi:brightness-6': mdi.mdiBrightness6,
  'mdi:brightness-7': mdi.mdiBrightness7,
  'mdi:cast': mdi.mdiCast,
  'mdi:cellphone': mdi.mdiCellphone,
  'mdi:checkbox-marked-circle-outline': mdi.mdiCheckboxMarkedCircleOutline,
  'mdi:device_tracker': mdi.mdiAccount,
  'mdi:door-closed': mdi.mdiDoorClosed,
  'mdi:door-open': mdi.mdiDoorOpen,
  'mdi:eye': mdi.mdiEye,
  'mdi:fan': mdi.mdiFan,
  'mdi:fan-chevron-up': mdi.mdiFanChevronUp,
  'mdi:flash': mdi.mdiFlash,
  'mdi:format-list-bulleted': mdi.mdiFormatListBulleted,
  'mdi:google': mdi.mdiGoogle,
  'mdi:google-downasaur': mdi.mdiGoogleDownasaur,
  'mdi:harddisk': mdi.mdiHarddisk,
  'mdi:home': mdi.mdiHome,
  'mdi:leak': mdi.mdiLeak,
  'mdi:led-on': mdi.mdiLedOn,
  'mdi:led-off': mdi.mdiLedOff,
  'mdi:led-strip-variant': mdi.mdiLedStripVariant,
  'mdi:lightbulb': mdi.mdiLightbulb,
  'mdi:lightbulb-group': mdi.mdiLightbulbGroup,
  'mdi:lightbulb-group-outline': mdi.mdiLightbulbGroupOutline,
  'mdi:lightbulb-outline': mdi.mdiLightbulbOutline,
  'mdi:map': mdi.mdiMap,
  'mdi:motion-sensor': mdi.mdiMotionSensor,
  'mdi:motion-sensor-off': mdi.mdiMotionSensorOff,
  'mdi:palette': mdi.mdiPalette,
  'mdi:phone': mdi.mdiPhone,
  'mdi:pine-tree': mdi.mdiPineTree,
  'mdi:power-plug': mdi.mdiPowerPlug,
  'mdi:power-plug-off': mdi.mdiPowerPlugOff,
  'mdi:power-socket-us': mdi.mdiPowerSocketUs,
  'mdi:remote': mdi.mdiRemote,
  'mdi:raspberry-pi': mdi.mdiRaspberryPi,
  'mdi:restart': mdi.mdiRestart,
  'mdi:scent': mdi.mdiScent,
  'mdi:script-text': mdi.mdiScriptText,
  'mdi:sim': mdi.mdiSim,
  'mdi:television': mdi.mdiTelevision,
  'mdi:thermometer': mdi.mdiThermometer,
  'mdi:timelapse': mdi.mdiTimelapse,
  'mdi:timer': mdi.mdiTimer,
  'mdi:timer-outline': mdi.mdiTimerOutline,
  'mdi:toggle-switch': mdi.mdiToggleSwitch,
  'mdi:update': mdi.mdiUpdate,
  'mdi:usb-port': mdi.mdiUsbPort,
  'mdi:vibrate': mdi.mdiVibrate,
  'mdi:volume-off': mdi.mdiVolumeOff,
  'mdi:water': mdi.mdiWater,
  'mdi:water-off': mdi.mdiWaterOff,
  'mdi:water-percent': mdi.mdiWaterPercent,
  'mdi:weather-cloudy': mdi.mdiWeatherCloudy,
  'mdi:weather-sunny': mdi.mdiWeatherSunny,
  'mdi:wifi-strength-1': mdi.mdiWifiStrength1,
  'mdi:wifi-strength-2': mdi.mdiWifiStrength2,
  'mdi:wifi-strength-3': mdi.mdiWifiStrength3,
  'mdi:wifi-strength-4': mdi.mdiWifiStrength4,
  'mdi:wifi-strength-off': mdi.mdiWifiStrengthOff,
  'mdi:wifi-strength-outline': mdi.mdiWifiStrengthOutline,
  'mdi:window-closed': mdi.mdiWindowClosed,
  'mdi:window-closed-variant': mdi.mdiWindowClosedVariant,
  'mdi:window-open': mdi.mdiWindowOpen,
  'mdi:window-open-variant': mdi.mdiWindowOpenVariant,
  'mdi:roller-shade-closed': mdi.mdiRollerShadeClosed,
  'mdi:roller-shade': mdi.mdiRollerShade,
  'mdi:tune': mdi.mdiTune,
  'mdi:settings': mdi.mdiCog,
};

interface IconProps extends SVGProps<SVGSVGElement> {
  icon?: string | undefined;
  size?: number | string;
}

/**
 * MdiIcon component from @mdi/react.
 * We use any here because the library types are sometimes problematic in different build environments.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const IconComp: any = MdiIcon;

export default function Icon({ icon, size = 1, ...props }: IconProps) {
  const path =
    (icon ? hassMappings[icon] : undefined) || mdi.mdiGoogleDownasaur;

  if (icon && !hassMappings[icon] && icon.startsWith('mdi:')) {
    console.log(`Icon not found "${icon}"`);
  }

  return <IconComp path={path} size={size} {...props} />;
}
