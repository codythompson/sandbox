// external imports
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

// internal imports
import reducers from './redux/reducers';
import App from './components/App/App';

// non js imports
import index from './index.html';
import imgLoading  from '../images/loading.svg';

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);