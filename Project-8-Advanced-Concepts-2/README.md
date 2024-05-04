# Projet 8 - Advanced Concepts 2

## Le hook useRef

L'initialisation et l'utilisation d'une ref est plutôt simple.

```js
import { useRef } from "react";

export function App() {
  const ref = useRef(0);

  function handleChange(e) {
    ref.current++;
  }

  return (
    <>
      <div>
        <input onChange={handleChange} type="number" name="creditCardNumber" />
      </div>
    </>
  );
}
```

On voit ici que l'utilisation est plus simple qu'un state, mais il y a une grande différence, l'utilisation d'une ref n’entraîne pas de re-render du composant.

Avec ce hook nous pouvons mettre en place des logiques d'interaction utilisateur qui n’entraîne pas de modification du DOM.

On peut récupérer la référence d'un élément du DOM qui ne sera exécuté qu'au premier render du composant.

```js
import { useRef } from "react";

export function App() {
  const cardNumberInputRef = useRef();

  function handleChange(e) {}

  return (
    <>
      <div>
        <input
          ref={(reference) => {
            cardNumberInputRef.current = reference;
          }}
          onChange={handleChange}
          type="number"
          name="creditCardNumber"
        />
      </div>
    </>
  );
}

// Version raccourci
<input
  ref={expirationInputRef}
  type="text"
  name="creditCardExpiration"
/>
```

Exemple d'interaction utilisateur qui n’entraîne pas de modification du DOM.

```js
import { useRef } from "react";

export function App() {
  const cardCodeInputRef = useRef();

  function handleChange(e) {
    if (e.target.value.length > 16) {
      cardCodeInputRef.current.focus();
    }
  }

  return (
    <>
      <div>
        <label>Numéro carte bancaire</label>
        <input onChange={handleChange} type="number" name="creditCardNumber" />
      </div>
      <div>
        <label>Code secret</label>
        <input
          ref={(reference) => {
            cardCodeInputRef.current = reference;
          }}
          type="number"
          name="creditCardCode"
        />
      </div>
    </>
  );
}
```

## Le hook useMemo

L'utilisation des states dans les composants React est très important, mais il peut arriver que nous n'avons pas envie de rejouer la génération d'une valeur si celle-ci ne change pas.

`useMemo()` nous permet d'enregistrer la valeur et de ne rejouer la fonction que si la valeur change, sinon il retourne la valeur précédemment enregistrée.

```js
import { useMemo, useState } from "react";

export default function UseMemo() {
  const [value, setValue] = useState(1);

  const result = useMemo(() => heavyCalculation(value), [value]);
}

function heavyCalculation(value) {
  // code long a exécuter par exemple...
}
```

## React Memo pour les composants

De la même façon que `useMemo()`, nous pouvons le faire sur nos composants, si nous ne voulons pas qu'un composant enfant soit re-render, nous utilisons `memo`.

```js
// Avant l'utilisation de memo et donc re-render à chaque fois
function Memo() {
  return <div style={{ marginTop: "100px" }}>Coucou !</div>;
}

// Avec memo
import { memo } from "react";

function Memo_() {
  return <div style={{ marginTop: "100px" }}>Coucou !</div>;
}

export const Memo = memo(Memo_);
```

On peut raccourcir l'écriture aussi.

```js
export const Memo = memo(() => {
  return <div style={{ marginTop: "100px" }}>Coucou !</div>;
});
```

## useCallback

Memo est très pratique pour les composants que l'on ne veut pas re-render, mais l'utilisation de fonction de callback dans les props, impose un re-render, car à chaque fois nous définissons une fonction de callback.

```js
// Composant parent
<Memo onClick={() => console.log("Click sur Le bouton")} />

// Composant enfant
import { memo } from "react";

export const Memo = memo(({ onClick }) => {
  console.log("RENDER <MEMO />");

  return (
    <button onClick={onClick} style={{ marginTop: "100px" }}>
      Coucou !
    </button>
  );
});
```

L'utilisation de `useCallback()` est tout simplement un raccourci de `useMemo()` pour la mise en sauvegarde d'une fonction.

```js
// Avec useMemo()
const onClickMemo = useMemo(() => {
  return function () {
    console.log("Click sur Le bouton");
  };
}, []);

// Avec useCallback()
const onClickMemo = useCallback(function () {
  console.log("Click sur Le bouton");
}, []);
```

## Le hook useReducer

`useReducer()` va nous permettre de remplacer `useState` quand nous avons un peu trop de logique à mettre en place autour d'une valeur.

Un reducer est généralement construit autour de deux fonctions, une pour initialiser la valeur et une fonction reducer.

```js
function setInitialValue() {}

function counterReducer() {}

export { setInitialValue, counterReducer };
```

L'appel de notre reducer est différent du `useState()`. On utilise `useReducer()` qui nous retourne deux choses, la valeur et une fonction pour envoyer un signal.

```js
import { useReducer } from "react";

export default function UseReducer() {
  const [counter, dispatchCounter] = useReducer();
}
```

Le reducer prend 3 valeurs en paramètres, le premier va être notre reducer, le second la valeur initiale et le troisième est fonction d'initialisation.

```js
import { counterReducer, setInitialValue } from "./counter-reducer";

export default function UseReducer() {
  const [counter, dispatchCounter] = useReducer(
    counterReducer,
    0,
    setInitialValue
  );
}
```

L'utilisation du reducer est très similaire à Redux, notre fonction va prendre en premier paramètre le state courant et en second l'action à effectuer.

```js
function counterReducer(currentState, action) {}
```

Notre reducer peut fonctionner avec uns switch pour savoir quelle action est demandé.

```js
function counterReducer(currentState, action) {
  switch (action.type) {
    case "increment":
      return currentState + 1;
    default:
      return currentState;
  }
}
```

Et cette action est demandée/appelée depuis notre signal `dispatch` que nous avons précédemment initialisé.

```js
<button onClick={() => dispatchCounter({ type: "increment" })}>
  Increment
</button>
```

Le dispatch prend un type pour notre action, mais il peut également prendre un payload.

```js
// Notre composant
<button
  onClick={() => dispatchCounter({ type: "customIncrement", payload: 3 })}
>
  Increment 3
</button>

// Notre reducer
function counterReducer(currentState, action) {
  switch (action.type) {
    case "customIncrement":
      return currentState + action.payload;
  }
}
```

Il n'est pas possible de faire d'appel asynchrone dans un reducer, nous allons donc créer une fonction asynchrone qui sera appelé avant le reducer et envoyé en payload à celui-ci.

```js
// Notre composant
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

// Notre reducer
async function fetchValue() {
  return (
    await axios(
      "https://www.random.org/integers/?num=1&min=1&max=1000&col=1&base=10&format=plain"
    )
  ).data;
}
function counterReducer(currentState, action) {
  switch (action.type) {
    case "setValue":
      return action.payload;
  }
}
```
