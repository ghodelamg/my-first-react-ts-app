export const UserGreeting = () => {
  return <h1>Welcome back!</h1>;
}

export const GuestGreeting = () => {
  return <h1>Please sign up.</h1>;
}

export const ConditionalRenderingOne = (props: {isLoggedIn: boolean}) => {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}