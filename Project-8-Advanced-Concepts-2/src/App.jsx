import { useRef } from "react";
import UseMemo from "./components/UseMemo/UseMemo";
import UseReducer from "./components/UseReducer/UseReducer";

export function App() {
  const cardCodeInputRef = useRef();
  const expirationInputRef = useRef();

  function handleCardNumberChange(e) {
    if (e.target.value.length >= 16) {
      cardCodeInputRef.current.focus();
    }
  }

  function handleCardCodeChange(e) {
    if (e.target.value.length >= 3) {
      expirationInputRef.current.focus();
    }
  }

  return (
    <>
      <div>
        <label>Numéro carte bancaire</label>
        <input
          onChange={handleCardNumberChange}
          type="number"
          name="creditCardNumber"
        />
      </div>
      <div>
        <label>Code secret</label>
        <input
          ref={(reference) => {
            cardCodeInputRef.current = reference;
          }}
          onChange={handleCardCodeChange}
          type="number"
          name="creditCardCode"
        />
      </div>
      <div>
        <label>Expiration date</label>
        <input
          ref={expirationInputRef}
          type="text"
          name="creditCardExpiration"
        />
      </div>
      <UseMemo />
      <UseReducer />
    </>
  );
}
