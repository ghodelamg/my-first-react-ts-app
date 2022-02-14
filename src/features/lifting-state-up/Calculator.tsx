import { TemperatureInput } from "./TempratureInput";

export const Calculator = () =>{
  return  <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
}