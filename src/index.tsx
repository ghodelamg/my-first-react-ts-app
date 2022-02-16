import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const App = lazy(() => import('./App'));
const Form = lazy(() => import('./features/main-concepts/Form'));
const NumberList = lazy(() => import('./features/main-concepts/ListingRenderingOne'));
const ConditionalRenderingOne = lazy(() => import('./features/main-concepts/ConditionalRenderingOne'));
const HandlingEventOne = lazy(() => import('./features/main-concepts/HandlingEventOne'));
const Calculator = lazy(() => import('./features/lifting-state-up/Calculator'));
const ContainmentEx2 = lazy(() => import('./features/composition-inheritance/ContainmentEx2'));
const WelcomeDialog = lazy(() => import('./features/composition-inheritance/ContainmentEx1'));
const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="form" element={<Form />} />
          <Route path="numbers" element={<NumberList numbers={numbers} />} />
          <Route path="conditional-rendering" element={<ConditionalRenderingOne isLoggedIn={false}/>} />
          <Route path="handling-events" element={<HandlingEventOne/>} />
          <Route path="lifting-state-up" element={<Calculator/>} />
          <Route path="containment-ex-1" element={<WelcomeDialog/>} />
          <Route path="containment-ex-2" element={<ContainmentEx2/>} />
        </Routes>
        </Suspense>
      </BrowserRouter>,
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
