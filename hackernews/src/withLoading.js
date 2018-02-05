import React from 'react';

import AppLoading from './AppLoading';

const withLoading = (Component) =>
  ({isLoading, ...rest}) =>
    isLoading
      ? <AppLoading />
      : <Component {...rest} />
      
export default withLoading;
