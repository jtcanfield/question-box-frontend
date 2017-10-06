import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import reducer from './components/reducer.js';
import reduxThunk from 'redux-thunk';

const store = createStore(
  reducer,
  applyMiddleware(reduxThunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
  <App/>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
