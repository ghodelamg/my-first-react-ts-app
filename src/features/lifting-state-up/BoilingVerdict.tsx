export const BoilingVerdict = (props: { celsius: number; }) => {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}