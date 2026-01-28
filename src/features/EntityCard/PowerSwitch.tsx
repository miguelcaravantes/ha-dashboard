import { useActionState } from 'react';
import { Switch, type Color, type SwitchProps } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import type { UseEntityResult } from '../../common/hooks/useEntity.js';

interface PowerSwitchProps {
  entity: UseEntityResult;
  color: Color;
  className?: string;
}

const StyledSwitch = styled(
  ({
    overrideColor: _overrideColor,
    ...props
  }: SwitchProps & { overrideColor: Color }) => <Switch {...props} />
)<{ overrideColor: Color }>((props) => ({
  opacity: props.disabled ? 0.7 : 1,
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
}: PowerSwitchProps) => {
  const [_, toggleAction, isPending] = useActionState(async () => {
    await toggle();
    return null;
  }, null);

  const switchProps: SwitchProps & { overrideColor: Color } = {
    overrideColor: color,
    checked: state === 'on',
    onChange: () => toggleAction(),
    disabled: isPending,
  };
  if (className) {
    switchProps.className = className;
  }

  return <StyledSwitch {...switchProps} />;
};

export default PowerSwitch;
