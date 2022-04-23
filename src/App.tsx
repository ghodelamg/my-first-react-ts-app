import React, { FormEvent } from 'react';
import { Counter } from './features/counter/Counter';
import HandlingEventOne from './features/main-concepts/HandlingEventOne'
import './App.css';
import { Outlet, Link } from "react-router-dom";


import {
  fetchNotifications,
  selectAllNotifications
} from './features/notifications/notificationsSlice'
import { useAppDispatch, useAppSelector } from './app/hooks';
function Welcome(props: any) {
  return <h1>Hello, {props.name}</h1>;
}
function SubmitForm() {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <button type="submit">Submit</button>
    </form>
  );
}
function App() {
  const dispatch = useAppDispatch();
   const notifications = useAppSelector(selectAllNotifications)
  const numUnreadNotifications = notifications.filter(n => !n.read).length

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications())
  }
  return (
    <div className="App">
      <header className="App-header">
        <Outlet />
        <br />
        <HandlingEventOne></HandlingEventOne>
        <Welcome name="Mukesh" />
        <SubmitForm></SubmitForm>
        <Counter />

        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
