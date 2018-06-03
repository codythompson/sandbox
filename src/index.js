// external imports
import React from 'react';
import ReactDOM from 'react-dom';

// internal imports
import Box from './components/Box/Box';

// non js imports
import index from './index.html';
import imgLoading  from '../images/loading.svg';
import Boxes from './components/Boxes/Boxes';

ReactDOM.render(
  <Boxes
    colors={['green', 'blue', 'pink']}
  />,
  document.getElementById('app')
);