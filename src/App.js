import React from "react";
import Panel from "./components/Panel";
import { HassContext } from "./HassContext";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import lightBlue from "@material-ui/core/colors/lightBlue";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: lightBlue[300],
    },
    background: {
      default: '#000',
      paper: 'rgba(11,11,11,.8)'

    }
  },
});

export default function App(props) {
  return (
    <HassContext.Provider value={props.hass}>
      <ThemeProvider theme={theme}>
        <Panel />
      </ThemeProvider>
    </HassContext.Provider>
  );
}
