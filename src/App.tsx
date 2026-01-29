import Panel from './features/Panel.js';
import { useDarkMode } from './common/hooks/useDarkMode.js';
import './index.css';

export default function App() {
  useDarkMode();

  return <Panel />;
}
