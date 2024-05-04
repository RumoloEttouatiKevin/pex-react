import { useCallback, useMemo, useState } from "react";
import { Memo } from "../Memo/Memo";
import { UseCallback } from "../UseCallback/UseCallback";

export default function UseMemo() {
  const [value, setValue] = useState(1);
  const [counter, setCounter] = useState(0);

  const increaseCounter = () => setCounter(counter + 1);

  const result = useMemo(() => heavyCalculation(value), [value]);

  const increaseValue = () => setValue(value + 1);

  const onClickMemo = useCallback(function () {
    console.log("Click sur Le bouton");
  }, []);

  return (
    <div style={{ marginTop: "100px" }}>
      <button onClick={increaseCounter}>Increase counter</button>
      <div>Counter : {counter}</div>
      <button onClick={increaseValue}>Increase value</button>
      <div>Result : {result}</div>

      <Memo onClick={onClickMemo} />
      <UseCallback onClick={onClickMemo} />
    </div>
  );
}

function heavyCalculation(value) {
  console.log("heavyCalculation()");
  let newResult = 0;
  for (let i = 0; i < 1000; i++) {
    console.log("heavyCalculation loop");
    newResult += i * value;
  }
  return newResult;
}
