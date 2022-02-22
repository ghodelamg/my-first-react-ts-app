import withCounter, { WithDataProps } from './withCounter'
const ClickCounter = ({count, incrementCount}: WithDataProps) => {
  return (
    <button onClick ={incrementCount}>
      Clicked {count} times
    </button>
  )
}
export default withCounter(ClickCounter)