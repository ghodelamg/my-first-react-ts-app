import React, { FormEvent } from 'react';
import { Counter } from './features/counter/Counter';
import HandlingEventOne from './features/main-concepts/HandlingEventOne'
import './App.css';
import { Outlet, Link } from "react-router-dom";
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
  return (
    <div className="App">
      <header className="App-header">
        <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem"
          }}
        >
          <Link to="/">App</Link> <br/>
          <Link to="/form">Form</Link><br/>
          <Link to="/numbers">Numbers</Link><br/>
          <Link to="/conditional-rendering">Conditional Rendering</Link><br/>
          <Link to="/handling-events">Handling Events</Link><br/>
          <Link to="/lifting-state-up">Lifting State Up</Link><br/>
          <Link to="/containment-ex-1">Composition/Inheritance - ContainMent Ex-1 (Pass all native elements)</Link><br/>
          <Link to="/containment-ex-2">Composition/Inheritance - ContainMent Ex-2 (Custom Component As Props)</Link><br/>
          <Link to="/context-ex-1">Context</Link><br/>
          <Link to="/forwarding-ref">Forwarding Ref</Link><br/>
          <Link to="/hoc-components">HOC Components</Link><br/>
          <Link to="/portals">Portals</Link><br/>
          <Link to="/refs">Refs</Link><br/>
          <Link to="/rendering-props">RenderingProps</Link><br/>
          <Link to="/use-effect-ex1">Use Effect Ex1</Link><br/>
          <Link to="/rtable">MUI Table</Link><br/>
        </nav>
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
