import Panel from './features/Panel';
import { GlobalStyles, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

export default function App() {
  return (
    <ThemeProvider theme={theme} defaultMode="dark">
      <CssBaseline />
      <GlobalStyles
        styles={`
          body {
            user-select: none;
          }

          react-panel {
            min-height: 100%;
            display: flex;
          }

          html,
          body {
            height: 100%;
          }
        `}
      />
      <Panel />
    </ThemeProvider>
  );
}
