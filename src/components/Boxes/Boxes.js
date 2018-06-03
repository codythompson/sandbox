import React from 'react';

import Box from '../Box/Box'

export default ({colors}) =>
  <div>
    {
      colors.map(color => 
        <Box color={color} />
      )
    }
  </div>