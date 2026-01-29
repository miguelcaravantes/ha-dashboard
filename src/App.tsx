import Panel from './features/Panel.js';
import { GlobalStyles, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.js';
import { MuiLayerProvider } from './common/MuiLayerProvider.js';
import './index.css';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <MuiLayerProvider>
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
              background-color: #000000;
            }
          `}
        />
        <Panel />
      </MuiLayerProvider>
    </ThemeProvider>
  );
}
