import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './features/main-concepts/Form'
import { NumberList } from './features/main-concepts/ListingRenderingOne';
import { ConditionalRenderingOne } from './features/main-concepts/ConditionalRenderingOne';
import HandlingEventOne from './features/main-concepts/HandlingEventOne';
import {Calculator} from './features/lifting-state-up/Calculator';
const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="form" element={<Form />} />
          <Route path="numbers" element={<NumberList numbers={numbers} />} />
          <Route path="conditional-rendering" element={<ConditionalRenderingOne isLoggedIn={false}/>} />
          <Route path="handling-events" element={<HandlingEventOne/>} />
          <Route path="lifting-state-up" element={<Calculator/>} />
        </Routes>
      </BrowserRouter>,
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
