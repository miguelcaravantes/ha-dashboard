import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
// import 'fontsource-roboto';
import 'fontsource-roboto/latin-300.css';
import 'fontsource-roboto/latin-400.css';
import 'fontsource-roboto/latin-500.css';
import 'fontsource-roboto/latin-700.css';
import App from './App';

class ReactWrapper extends HTMLElement {
  set hass(value) {
    this._hass = value;
    this.render();
  }
  disconnectedCallback() {
    ReactDOM.unmountComponentAtNode(this);
  }
  render() {
    ReactDOM.render(<App hass={this._hass} />, this);
  }
}
customElements.define('react-panel', ReactWrapper);
