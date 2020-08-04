import { useHass } from './useHass';

import LightBulbIcon from 'mdi-material-ui/Lightbulb';
import PowerSocketUsIcon from 'mdi-material-ui/PowerSocketUs';
import CastIcon from 'mdi-material-ui/Cast';
import PaletteIcon from 'mdi-material-ui/Palette';
import AccountIcon from 'mdi-material-ui/Account';
import FanIcon from 'mdi-material-ui/Fan';
import ScriptTextIcon from 'mdi-material-ui/ScriptText';
import ToggleSwitchIcon from 'mdi-material-ui/ToggleSwitch';
import FormatListBulletedIcon from 'mdi-material-ui/FormatListBulleted';
import AirFilterIcon from 'mdi-material-ui/AirFilter';
import GoogleIcon from 'mdi-material-ui/Google';
import GoogleDownasaurIcon from 'mdi-material-ui/GoogleDownasaur';
import RemoteIcon from 'mdi-material-ui/Remote';
import WeatherSunnyIcon from 'mdi-material-ui/WeatherSunny';
import WeatherCloudyIcon from 'mdi-material-ui/WeatherCloudy';

import HomeIcon from 'mdi-material-ui/Home';
import FanChevronUp from 'mdi-material-ui/FanChevronUp';
import Battery10Icon from 'mdi-material-ui/Battery10';
import Battery20Icon from 'mdi-material-ui/Battery20';
import Battery30Icon from 'mdi-material-ui/Battery30';
import Battery40Icon from 'mdi-material-ui/Battery40';
import Battery50Icon from 'mdi-material-ui/Battery50';
import Battery60Icon from 'mdi-material-ui/Battery60';
import Battery70Icon from 'mdi-material-ui/Battery70';
import Battery80Icon from 'mdi-material-ui/Battery80';
import Battery90Icon from 'mdi-material-ui/Battery90';
import BatteryIcon from 'mdi-material-ui/Battery';
import MapIcon from 'mdi-material-ui/Map';
import WifiStrengthOffIcon from 'mdi-material-ui/WifiStrengthOff';
import WifiStrength4Icon from 'mdi-material-ui/WifiStrength4';
import WifiStrength3Icon from 'mdi-material-ui/WifiStrength3';
import WifiStrength2Icon from 'mdi-material-ui/WifiStrength2';
import WifiStrength1Icon from 'mdi-material-ui/WifiStrength1';
import CheckboxMarkedCircleOutlineIcon from 'mdi-material-ui/CheckboxMarkedCircleOutline';
import FlashIcon from 'mdi-material-ui/Flash';
import TimerIcon from 'mdi-material-ui/Timer';
import TelevisionIcon from 'mdi-material-ui/Television';
import GoogleHomeIcon from 'mdi-material-ui/GoogleHome';
import CellphoneIcon from 'mdi-material-ui/Cellphone';
import UpdateIcon from 'mdi-material-ui/Update';
import TimelapseIcon from 'mdi-material-ui/Timelapse';
import RestartIcon from 'mdi-material-ui/Restart';
import AccessPointNetworkIcon from 'mdi-material-ui/AccessPointNetwork';
import EyeIcon from 'mdi-material-ui/Eye';

const hassMappings = {
  'mdi:home': HomeIcon,
  'mdi:fan-chevron-up': FanChevronUp,
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
};

const domainMapping = {
  light: LightBulbIcon,
  switch: PowerSocketUsIcon,
  media_player: CastIcon,
  scene: PaletteIcon,
  person: AccountIcon,
  device_tracker: AccountIcon,
  fan: FanIcon,
  script: ScriptTextIcon,
  input_boolean: ToggleSwitchIcon,
  input_select: FormatListBulletedIcon,
  remote: RemoteIcon,
  sun: WeatherSunnyIcon,
  weather: WeatherCloudyIcon,
  sensor: EyeIcon,
};

const overridableDomains = ['switch', 'sensor', 'binary_sensor'];

export default function useEntity(entityId) {
  const { states, callService } = useHass();

  const stateObj = states[entityId];
  const domain = entityId.split('.')[0];

  const isToggleable = ['switch', 'fan', 'light'].includes(domain);

  const isExecutable = ['scene', 'script'].includes(domain);

  const getIcon = () => {
    let Icon = GoogleDownasaurIcon;

    const DomainIcon = domainMapping[domain];

    if (DomainIcon) {
      Icon = DomainIcon;
    }

    const HassIcon = hassMappings[stateObj.attributes.icon];
    if (HassIcon) {
      Icon = HassIcon;
    }

    if (Icon === GoogleDownasaurIcon && stateObj.attributes.icon) {
      console.log(entityId, stateObj);
    }
    return Icon;
  };

  const toggle = () => {
    callService(domain, 'toggle', {
      entity_id: entityId,
    });
  };

  const execute = () => {
    callService(domain, 'turn_on', {
      entity_id: entityId,
    });
  };

  return {
    stateObj,
    domain,
    name: stateObj.attributes.friendly_name ?? entityId,
    isToggleable,
    isExecutable,
    toggle,
    execute,
    Icon: getIcon(),
  };
}
