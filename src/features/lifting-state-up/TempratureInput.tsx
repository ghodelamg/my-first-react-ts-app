import React, { FormEvent } from "react";
type MyProps = any;
type MyState = { temperature: string };
const scaleNames: {[key: string]: string} = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

export class TemperatureInput extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: FormEvent) {
      this.props.onTemperatureChange((e.target as HTMLInputElement).value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}