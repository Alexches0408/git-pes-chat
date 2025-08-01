import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatMascotPlugin from './components/ChatMascotPlugin';
import { store } from './app/store'
import { Provider } from 'react-redux'
import App from './App';
import './index.css'; // если нужно стили
import SideBarOpen from './components/SideBarOpen';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
  </React.StrictMode>
);