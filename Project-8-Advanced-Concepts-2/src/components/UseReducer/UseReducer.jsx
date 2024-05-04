import { useReducer } from "react";
import { counterReducer, fetchValue, setInitialValue } from "./counter-reducer";

export default function UseReducer() {
  const [counter, dispatchCounter] = useReducer(
    counterReducer,
    0,
    setInitialValue
  );

  return (
    <div style={{ marginTop: "100px" }}>
      <h1>Counter : {counter}</h1>
      <button onClick={() => dispatchCounter({ type: "increment" })}>
        Increment
      </button>
      <button onClick={() => dispatchCounter({ type: "decrement" })}>
        Decrement
      </button>
      <button onClick={() => dispatchCounter({ type: "reset" })}>Reset</button>
      <button
        onClick={() => dispatchCounter({ type: "customIncrement", payload: 3 })}
      >
        Increment 3
      </button>
      <button
        onClick={() => dispatchCounter({ type: "customIncrement", payload: 6 })}
      >
        Increment 6
      </button>
      <button
        onClick={async () => {
          dispatchCounter({
            type: "setValue",
            payload: await fetchValue(),
          });
        }}
      >
        Set random value from API
      </button>
    </div>
  );
}
