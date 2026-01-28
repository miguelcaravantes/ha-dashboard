import { Slider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledSlider = styled(Slider)(({ theme }) => ({
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.text.primary
      : theme.palette.primary.light,
  height: 40,
  '& .MuiSlider-rail': {
    height: 40,
    borderRadius: 2,
  },
  '& .MuiSlider-track': {
    height: 40,
    borderRadius: 2,
    boxShadow: '0px 0px 10px 0px rgba(255, 255, 255, 0.7)',
  },
  '& .MuiSlider-thumb': {
    display: 'none',
  },
}));

interface LightBrightnessProps {
  value: number;
  onChange: (newValue: number) => void;
  disabled?: boolean;
}

const LightBrightness = ({
  value,
  onChange,
  disabled,
}: LightBrightnessProps) => (
  <>
    <Typography variant="h6">Brightness:</Typography>
    <StyledSlider
      min={0}
      max={255}
      step={15}
      value={value}
      valueLabelDisplay="auto"
      onChange={(_e, newValue) => onChange(newValue as number)}
      disabled={disabled ?? false}
    />
  </>
);

export default LightBrightness;
