import React from 'react';
import ReactDOM from 'react-dom/client';
import { HeroUIProvider } from '@heroui/react';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HeroUIProvider>
      <Provider store={store}>
        <main className="">
          <App />
        </main>
      </Provider>
    </HeroUIProvider>
  </React.StrictMode>
);
