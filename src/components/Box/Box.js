import React from 'react';

import styles from './styles.scss'

const Box = ({color='grey'}) => 
  <div
    style={{backgroundColor: color}}
    className="box">
  </div>

export default Box;