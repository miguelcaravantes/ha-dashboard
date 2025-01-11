import Panel from './features/Panel';
import { GlobalStyles } from '@mui/material';
import {
  createTheme,
  ThemeProvider as ThemeProvider,
} from '@mui/material/styles';
import lightBlue from '@mui/material/colors/lightBlue';

const prefersDarkMode = true; //useMediaQuery('(prefers-color-scheme: dark)');
const theme = createTheme({
  spacing: (factor) => `${factor * 8}px`,
  palette: {
    mode: prefersDarkMode ? 'dark' : 'light',
    primary: {
      main: lightBlue[300],
    },
  },
});
if (prefersDarkMode) {
  theme.palette.background.default = 'black';
  theme.palette.background.paper = 'rgba(11,11,11,.85)';
}

export default function App() {
  return (
    <>
      <GlobalStyles
        styles={`
          body {
            padding: 0;
            font-family: 'Roboto', 'sans-serif';
            box-sizing: border-box;
            user-select: none;
          }

          react-panel {
            min-height: 100%;
            display: flex;
          }

          html,
          body {
            margin: 0;
            height: 100%;
          }

          html {
            box-sizing: border-box;
          }
          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }
        `}
      />
      <ThemeProvider theme={theme}>
        <Panel />
      </ThemeProvider>
    </>
  );
}
