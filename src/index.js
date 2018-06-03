// external imports
import React from 'react';
import ReactDOM from 'react-dom';

// non js imports
import index from './index.html';
import imgLoading  from '../images/loading.svg';

(elv => console.log(`ello ${elv}`))('warld');

ReactDOM.render(
  <h1>
    ello borld
  </h1>,
  document.getElementById('app')
);