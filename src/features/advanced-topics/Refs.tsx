import React from "react";
type MyProps = any;
type MyState = { textInput: React.RefObject<HTMLInputElement> };
export class CustomTextInput extends React.Component<MyProps, MyState> {
  textInput: React.RefObject<HTMLInputElement>;
  constructor(props: any) {
    super(props);
    // create a ref to store the textInput DOM element
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput?.current?.focus();
  }

  render() {
    // tell React that we want to associate the <input> ref
    // with the `textInput` that we created in the constructor
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}

export default class AutoFocusTextInput extends React.Component {
  textInput: React.RefObject<CustomTextInput>;
  constructor(props: any) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current?.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}