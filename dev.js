import '@vite/client';
import './src/index.jsx';

// var client = document.createElement('script');
// client.type = 'module';
// client.src = 'http://localhost:8080/@vite/client';
// document.head.append(client);

// var index = document.createElement('script');
// index.type = 'module';
// index.src = 'http://localhost:8080/src/index.jsx';
// document.head.append(index);

// var refresh = document.createElement('script');
// refresh.type = 'module';
// refresh.innerHTML = `
//   import RefreshRuntime from 'http://localhost:8080/@react-refresh'
//   RefreshRuntime.injectIntoGlobalHook(window)
//   window.$RefreshReg$ = () => {}
//   window.$RefreshSig$ = () => (type) => type
//   window.__vite_plugin_react_preamble_installed__ = true
// `;
// document.head.append(refresh);

import RefreshRuntime from 'http://localhost:8080/@react-refresh';
RefreshRuntime.injectIntoGlobalHook(window);
window.$RefreshReg$ = () => {};
window.$RefreshSig$ = () => (type) => type;
window.__vite_plugin_react_preamble_installed__ = true;
