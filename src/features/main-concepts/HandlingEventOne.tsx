import React from "react";
import { FormEvent } from "react";
type MyProps = any;
type MyState = { isToggleOn: boolean };
class HandlingEventOne extends React.Component<MyProps, MyState> {
  constructor(props:any) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e:FormEvent) {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

export default HandlingEventOne;