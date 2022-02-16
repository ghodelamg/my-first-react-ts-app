import React from "react";
import { BoilingVerdict } from "./BoilingVerdict";
import { TemperatureInput } from "./TempratureInput";

const toCelsius = (fahrenheit: string) => {
  return (parseFloat(fahrenheit) - 32) * 5 / 9;
}

const toFahrenheit = (celsius: string) => {
  return (parseFloat(celsius) * 9 / 5) + 32;
}

const tryConvert = (temperature: string, convert: Function) => {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

const Calculator = () =>{
  const [localState, setLocalState] = React.useState<{scale: string, temperature: string}>({scale: '', temperature: ''});

  const handleCelsiusChange = (temperature: string) => {
    debugger
    setLocalState({scale: 'c', temperature: temperature});
  }

  const handleFahrenheitChange = (temperature: string) => {
    setLocalState({scale: 'f', temperature: temperature});
  }

  return  (<div>
        <TemperatureInput
          scale="c"
          temperature={localState.scale === 'f' ? tryConvert(localState.temperature, toCelsius) : localState.temperature}
          onTemperatureChange={handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={localState.scale === 'c' ? tryConvert(localState.temperature, toFahrenheit) : localState.temperature}
          onTemperatureChange={handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(localState.scale === 'f' ? tryConvert(localState.temperature, toCelsius) : localState.temperature)} />
      </div>)
}

export default Calculator