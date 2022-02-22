import React, {useState} from 'react'
export interface WithDataProps {
  incrementCount: () => void
  count: number;
}
const withCounter = (OriginalComponent: React.ComponentType<WithDataProps>) => {
  const EnhancedComponent = () => {
   const [count, setCount] = useState(0)
   const incrementCount = () => setCount(prevCount => prevCount + 1)
    return (
      <OriginalComponent
        incrementCount ={incrementCount}
        count={count}
      />
    )
  }
  return EnhancedComponent
}
export default withCounter