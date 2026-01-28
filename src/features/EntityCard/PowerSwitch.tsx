import { Switch } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import type { UseEntityResult } from '../../common/hooks/useEntity.js';

interface Color {
  [key: number]: string;
}

interface PowerSwitchProps {
  entity: UseEntityResult;
  color: Color;
  className?: string;
}

const StyledSwitch = styled(
  ({ overrideColor: _overrideColor, ...props }: any) => <Switch {...props} />
)<{ overrideColor: Color }>((props) => ({
  '.MuiSwitch-switchBase': {
    '&.Mui-checked': {
      color: props.overrideColor[100],
      '&:hover': {
        backgroundColor: alpha(
          props.overrideColor[100],
          props.theme.palette.action.hoverOpacity
        ),
      },
    },
    '&.Mui-checked + .MuiSwitch-track': {
      backgroundColor: props.overrideColor[100],
    },
  },
}));

const PowerSwitch = ({
  entity: { state, toggle },
  color,
  className,
}: PowerSwitchProps) => (
  <StyledSwitch
    className={className}
    overrideColor={color}
    checked={state === 'on'}
    onChange={toggle}
  />
);

export default PowerSwitch;
