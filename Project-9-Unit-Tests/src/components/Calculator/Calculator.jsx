import { useState } from "react";
import { sum, divide, multiply, substract } from "utils/math-functions";

const OPERATORS = ["+", "-", "x", "/"];
export function Calculator({ defaultA, defaultB, defaultOperator }) {
  const [inputValueA, setInputValueA] = useState(
    !defaultA || isNaN(defaultA) ? 0 : Number(defaultA)
  );
  const [inputValueB, setInputValueB] = useState(
    !defaultB || isNaN(defaultB) ? 0 : Number(defaultB)
  );
  const [operator, setOperator] = useState(
    OPERATORS.includes(defaultOperator) ? defaultOperator : "+"
  );

  // We need that because we don't want to write "0"
  //in the input when it's empty
  const valueA = inputValueA || 0;
  const valueB = inputValueB || 0;

  function getResult() {
    switch (operator) {
      case "+":
        return sum(valueA, valueB);
      case "-":
        return substract(valueA, valueB);
      case "x":
        return multiply(valueA, valueB);
      case "/":
        return divideSafely(valueA, valueB);
      default:
        return "No operator provided";
    }
  }
  function divideSafely(a_, b_) {
    try {
      return divide(a_, b_);
    } catch (err) {
      return err.message;
    }
  }
  const renderInputA = () => (
    <input
      data-testid="inputA"
      type="number"
      value={inputValueA}
      onChange={(e) =>
        setInputValueA(e.target.value ? Number.parseInt(e.target.value) : "")
      }
    />
  );

  const renderInputB = () => (
    <input
      data-testid="inputB"
      type="number"
      value={inputValueB}
      onChange={(e) =>
        setInputValueB(e.target.value ? Number.parseInt(e.target.value) : "")
      }
    />
  );

  const renderSelectBox = () => (
    <div>
      <select
        data-testid="operator"
        value={operator}
        onChange={(e) => setOperator(e.target.value)}
        className="form-select"
        aria-label="Operator"
      >
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="x">x</option>
        <option value="/">/</option>
      </select>
    </div>
  );

  return (
    <>
      <h1 style={{ marginBottom: 40 }}>Calculator</h1>
      {renderInputA()}
      {renderSelectBox()}
      {renderInputB()}
      <h2 style={{ marginTop: 20 }}>Result</h2>
      <span data-testid="result">{getResult()}</span>
    </>
  );
}
