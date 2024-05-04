import axios from "axios";

function setInitialValue(initialValue) {
  return initialValue;
}

async function fetchValue() {
  return (
    await axios(
      "https://www.random.org/integers/?num=1&min=1&max=1000&col=1&base=10&format=plain"
    )
  ).data;
}

function counterReducer(currentState, action) {
  switch (action.type) {
    case "increment":
      return currentState + 1;
    case "decrement":
      return currentState - 1;
    case "reset":
      return setInitialValue(0);
    case "customIncrement":
      return currentState + action.payload;
    case "setValue":
      return action.payload;
    default:
      return currentState;
  }
}

export { setInitialValue, counterReducer, fetchValue };
