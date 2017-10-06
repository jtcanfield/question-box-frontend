import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import reducer from './components/reducer.js';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
  <App/>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
