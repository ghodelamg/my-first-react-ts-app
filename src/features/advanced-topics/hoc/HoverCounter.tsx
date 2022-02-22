import withCounter, { WithDataProps } from './withCounter'
const HoverCounter = ({count, incrementCount}:WithDataProps) => {
return (
    <button onMouseOver ={incrementCount}>
      Hovered {count} times
    </button>
  )
}
export default withCounter(HoverCounter)