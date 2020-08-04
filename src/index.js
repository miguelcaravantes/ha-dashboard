import './index.css';
// import 'fontsource-roboto';
import "fontsource-roboto/latin-300.css"
import "fontsource-roboto/latin-400.css"
import "fontsource-roboto/latin-500.css"
import "fontsource-roboto/latin-700.css"
import App from './App';
import ReactPanelElement from './ReactPanelElement.js';


customElements.define('react-panel', ReactPanelElement(App));
