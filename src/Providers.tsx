import React from 'react';
import { Provider } from 'react-redux';

import store from './redux/store';
import Routes from './Routes';

interface ProvidersProps {}

const Providers = ({}: ProvidersProps) => {
  return (
    <Provider {...{ store }}>
      <Routes />
    </Provider>
  );
};

export default Providers;
