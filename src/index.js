import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import 'tachyons';
import './index.css';
import { searchRobots, requestRobots } from './reducers/reducers';

// middleware
const logger = createLogger();
// combinar reducers 
const rootReducer = combineReducers({ searchRobots, requestRobots});
// rootReducer reune los reducer creados
// thunkMiddleware es un middleware que espera si alguna acción devuelve 
// una funcion en vez de un objeto.
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
