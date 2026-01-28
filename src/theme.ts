import { createTheme } from '@mui/material/styles';
import { lightBlue } from '@mui/material/colors';

const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: lightBlue[300],
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: lightBlue[300],
        },
        background: {
          default: '#121212',
          paper: '#1e1e1e',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
