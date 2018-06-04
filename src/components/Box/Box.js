import React from 'react';

import styles from './styles.scss'

const Box = ({onClick= e=>console.log(e.target), color='grey'}) => 
  <div
    onClick={onClick}
    style={{backgroundColor: color}}
    className="box">
  </div>

export default Box;