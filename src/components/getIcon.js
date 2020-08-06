import {
  Lightbulb as LightbulbIcon,
  LightbulbGroup as LightbulbGroupIcon,
  PowerSocketUs as PowerSocketUsIcon,
  Cast as CastIcon,
  Palette as PaletteIcon,
  Account as AccountIcon,
  Fan as FanIcon,
  ScriptText as ScriptTextIcon,
  ToggleSwitch as ToggleSwitchIcon,
  FormatListBulleted as FormatListBulletedIcon,
  AirFilter as AirFilterIcon,
  Google as GoogleIcon,
  GoogleDownasaur as GoogleDownasaurIcon,
  Remote as RemoteIcon,
  WeatherSunny as WeatherSunnyIcon,
  WeatherCloudy as WeatherCloudyIcon,
  Home as HomeIcon,
  FanChevronUp as FanChevronUpIcon,
  Battery10 as Battery10Icon,
  Battery20 as Battery20Icon,
  Battery30 as Battery30Icon,
  Battery40 as Battery40Icon,
  Battery50 as Battery50Icon,
  Battery60 as Battery60Icon,
  Battery70 as Battery70Icon,
  Battery80 as Battery80Icon,
  Battery90 as Battery90Icon,
  Battery as BatteryIcon,
  Map as MapIcon,
  WifiStrengthOff as WifiStrengthOffIcon,
  WifiStrength4 as WifiStrength4Icon,
  WifiStrength3 as WifiStrength3Icon,
  WifiStrength2 as WifiStrength2Icon,
  WifiStrength1 as WifiStrength1Icon,
  CheckboxMarkedCircleOutline as CheckboxMarkedCircleOutlineIcon,
  Flash as FlashIcon,
  Timer as TimerIcon,
  Television as TelevisionIcon,
  GoogleHome as GoogleHomeIcon,
  Cellphone as CellphoneIcon,
  Update as UpdateIcon,
  Timelapse as TimelapseIcon,
  Restart as RestartIcon,
  AccessPointNetwork as AccessPointNetworkIcon,
  Eye as EyeIcon,
  Thermometer as ThermometerIcon,
  WaterPercent as WaterPercentIcon,
} from 'mdi-material-ui';

const hassMappings = {
  'mdi:home': HomeIcon,
  'mdi:fan-chevron-up': FanChevronUpIcon,
  'mdi:battery-10': Battery10Icon,
  'mdi:battery-20': Battery20Icon,
  'mdi:battery-30': Battery30Icon,
  'mdi:battery-40': Battery40Icon,
  'mdi:battery-50': Battery50Icon,
  'mdi:battery-60': Battery60Icon,
  'mdi:battery-70': Battery70Icon,
  'mdi:battery-80': Battery80Icon,
  'mdi:battery-90': Battery90Icon,
  'mdi:battery': BatteryIcon,
  'mdi:map': MapIcon,
  'mdi:wifi-strength-off': WifiStrengthOffIcon,
  'mdi:wifi-strength-1': WifiStrength1Icon,
  'mdi:wifi-strength-2': WifiStrength2Icon,
  'mdi:wifi-strength-3': WifiStrength3Icon,
  'mdi:wifi-strength-4': WifiStrength4Icon,
  'mdi:checkbox-marked-circle-outline': CheckboxMarkedCircleOutlineIcon,
  'mdi:flash': FlashIcon,
  'mdi:timer': TimerIcon,
  'mdi:television': TelevisionIcon,
  'mdi:google-home': GoogleHomeIcon,
  'mdi:cellphone': CellphoneIcon,
  'mdi:air-filter': AirFilterIcon,
  'mdi:fan': FanIcon,
  'mdi:update': UpdateIcon,
  'mdi:timelapse': TimelapseIcon,
  'mdi:restart': RestartIcon,
  'mdi:access-point-network': AccessPointNetworkIcon,
  'mdi:google': GoogleIcon,
  'mdi:thermometer': ThermometerIcon,
  'mdi:water-percent': WaterPercentIcon,
  'mdi:lightbulb': LightbulbIcon,
  'mdi:lightbulb-group': LightbulbGroupIcon,
  'mdi:power-socket-us': PowerSocketUsIcon,
  'mdi:cast': CastIcon,
  'mdi:palette': PaletteIcon,
  'mdi:account': AccountIcon,
  'mdi:device_tracker': AccountIcon,
  'mdi:fan': FanIcon,
  'mdi:script-text': ScriptTextIcon,
  'mdi:toggle-switch': ToggleSwitchIcon,
  'mdi:format-list-bulleted': FormatListBulletedIcon,
  'mdi:remote': RemoteIcon,
  'mdi:weather-sunny': WeatherSunnyIcon,
  'mdi:weather-cloudy': WeatherCloudyIcon,
  'mdi:eye': EyeIcon,
  'mdi:google-downasaur': GoogleDownasaurIcon,
};

export default function getIcon(iconTag) {
  const Icon = hassMappings[iconTag];
  if (!Icon && iconTag?.startsWith('mdi:')) {
    alert(`Icon not found "${iconTag}"`);
  }
  return Icon || GoogleDownasaurIcon;
}