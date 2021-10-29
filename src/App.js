import React from 'react';
import Panel from './features/Panel';
import { HassContext } from './common/HassContext';
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

export default function App(props) {
  return (
    <HassContext.Provider value={props.hass}>
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
    </HassContext.Provider>
  );
}
