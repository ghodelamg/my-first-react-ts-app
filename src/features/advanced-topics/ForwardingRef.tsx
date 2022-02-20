import React from "react";

const FancyButton = React.forwardRef((props: any, ref: any) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));



const ForwardingRef = () => {
    // You can now get a ref directly to the DOM button:
    const ref = React.createRef();
    return (<FancyButton ref={ref}>Click me!</FancyButton>);
}

export default ForwardingRef;