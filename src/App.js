import React from 'react';
import Panel from './components/Panel';
import { HassContext } from './common/HassContext';
import { ThemeProvider } from '@emotion/react';
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';

const prefersDarkMode = true; //useMediaQuery('(prefers-color-scheme: dark)');
const theme = createMuiTheme({
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
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <Panel />
          </ThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </HassContext.Provider>
  );
}
