import React from 'react';

import Box from '../Box/Box';

const colors = ['blue', 'darkslategrey', 'orange', 'pink', 'cyan', 'brown', 'dodgerblue'];

const pickRandom = (arr) => arr[Math.floor(Math.random()*arr.length)];

export default ({boxes, onBoxClick, onAddClick, onColorChangeClick}) => {
  return (
  <div>
    <Box
      onClick={()=>onAddClick && onAddClick(pickRandom(colors))}
      color="green"/>
    <Box
      onClick={()=>onColorChangeClick && onColorChangeClick(pickRandom(boxes.map((bx,i)=>i)), pickRandom(colors))}
      color="purple"/>
    <br/>
    {
      boxes.map(({color}, i) => 
        <Box
         key={i}
         onClick={()=>onBoxClick && onBoxClick(i)}
         color={color} />
      )
    }
    <br/>
  </div>
  );
}