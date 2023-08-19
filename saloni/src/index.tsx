import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { ChakraProvider } from '@chakra-ui/react';
import { saloniTheme } from './assets/styles/SaloniTheme';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';

const root = ReactDOM?.createRoot(
  document?.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {' '}
        <ChakraProvider theme={saloniTheme}>
          <App />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
