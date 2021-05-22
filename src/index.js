import React from 'react';
import ReactDOM from 'react-dom';

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
