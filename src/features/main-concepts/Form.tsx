import React, { FormEvent } from "react";
type MyProps = any;
type MyState = { value: string };
export default class NameForm extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: FormEvent) {
    this.setState({value: (event.target as HTMLInputElement).value});
  }

  handleSubmit(event: FormEvent) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}