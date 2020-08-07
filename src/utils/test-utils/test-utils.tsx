import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react-native';
import { rootReducer } from '../../redux/rootReducer';
import { Provider } from 'react-redux';

const customRender = (
  ui: React.ReactElement,
  preloadedState = {},
  options?: Omit<RenderOptions, 'queries'>,
) => {
  const WithAllProviders = ({ children }: { children: React.ReactElement }) => {
    const configStore = configureStore({
      reducer: rootReducer,
      preloadedState,
    });

    return <Provider store={configStore}>{children}</Provider>;
  };

  return render(ui, { wrapper: WithAllProviders, ...options });
};

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { customRender as render };
