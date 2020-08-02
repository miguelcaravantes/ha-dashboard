import './index.css';
// import 'fontsource-roboto';
import App from './App';
import ReactPanelElement from './ReactPanelElement.js';


customElements.define('react-panel', ReactPanelElement(App));
