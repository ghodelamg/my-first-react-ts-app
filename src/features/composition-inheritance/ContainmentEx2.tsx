const  Contacts = () => {
  return <div className="Contacts">Contacts</div>;
}

const  Chat = () => {
  return <div className="Chat">Chat</div>;
}

const  SplitPane = (props: any) => {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

const ContainmentEx2 = () => {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}

export default ContainmentEx2;