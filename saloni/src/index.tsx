import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { saloniTheme } from './assets/styles/SaloniTheme';
import { Provider } from 'react-redux';
import { store } from './redux/store';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={saloniTheme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
);
