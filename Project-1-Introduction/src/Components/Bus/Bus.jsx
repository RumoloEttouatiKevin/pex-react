export function Bus(props) {
  // function onClick() {
  //   props.onBusClick(2);
  // }

  return (
    <div>
      Je suis {"<Bus />"}
      {/* <button onClick={onClick}>click</button> */}
      <button onClick={() => props.onBusClick(2)}>click</button>
    </div>
  );
}
