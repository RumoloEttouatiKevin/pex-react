# Projet 4 - Redux

## Installation de Redux

Il y a deux librairies à installer, nous allons les installer avec des version précise.

```shell
npm install @reduxjs/toolkit@1.9.0
npm install react-redux@8.0.5

# ou

npm i @reduxjs/toolkit@1.9.0 react-redux@8.0.5
```

## Fichier de config JS pour REACT

On peut créer un fichier de configuration pour REACT à la racine du projet `jsconfig.json` celui-ci est un fichier JSON.

```json
{
    "compilerOptions": {
        "baseUrl": "./src",
        "checkJs": false,
        "jsx": "react"
    }
}
```

Cela permet de spécifier où se trouve le chemin du projet à build et ça va également nous permettre en autre de ne plus avoir besoin de spécifier des chemins relatifs pour nos assets `../../../assets/images/...`, mais directement `assets/images/...`.

## Création de notre store

La bonne pratique est de centraliser tout ce qui concerne notre store lié à redux.

On va créer notre store avec une configuration minimal.

```js
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
});

export { store };
```

## Avoir accès à Redux depuis notre app

Pour avoir accès à Redux depuis notre application, il va falloir importer le Provider de react-redux dans l'index.js de notre projet et à la manière d'un composant "parent", il faut entourer notre application de ce composant.

```js
import { store } from "store"

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

À ce provider nous lui fournissons une seule "props" qui est notre store.

## Redux DevTools

Il est conseillé d'installation cette extension chrome pour facilité la lisibilité en mode dev des stores de l'application.

## Les slices

Dans notre store, nous allons créer des slices, autrement dit des morceaux différent pour séparer les types de données que nous voulons avoir dans notre store.

Création de notre première slice, celle-ci est dans son propre fichier `store/expense/expense-slice.js`.

```js
import { createSlice } from "@reduxjs/toolkit";

export const expenseSlice = createSlice({
  name: "expenseSlice",
  initialState: {
    expenseList: [],
  },
});

const { addExpense, setIncome, incrementCountActionPerformed } = expenseSlice.actions;

export { addExpense, setIncome, incrementCountActionPerformed };
```

Il faut lui donner un nom et un état initial.

Il faut ensuite créer une clé dans notre store pour "l'initialiser", l'appel du reducer qui est une valeur cachée si elle n'est pas initialisée dans notre slice permet d'avoir accès aux données.

```js
import { expenseSlice } from "./expense/expense-slice";

const store = configureStore({
  reducer: {
    EXPENSE: expenseSlice.reducer,
  },
});
```

## Créer une action dans notre slice pour écrire dedans

Pour interagir avec notre slice, il faut créer des actions dans le reducers de celle-ci.

```js
export const expenseSlice = createSlice({
  name: "expenseSlice",
  initialState: {
    expenseList: [],
  },
  reducers: {
    addExpense: (currentSlice, action) => {
      // Code
    },
  },
});
```

Ici, nous créons l'actions `addExpense` qui prend comme paramètre la slice courante et les données envoyé.

Il faut également exporter nos actions pour pouvoir les utiliser.

```js
const { addExpense } = expenseSlice.actions;
export { addExpense };
```

## Utilisation de notre action

Pour pouvoir appeler notre action, il va falloir utiliser un hook pour envoyer un événement qui sera interprété par notre store. Cette subtilité est très importante, Redux fonctionne sur le principe d'écouteur d'événement.

Pour appeler notre action depuis un composant, il faut utiliser `useDispatch` de react-redux pour envoyer un événement.

```js
import { useDispatch } from "react-redux";
import { addExpense } from "store/expense/expense-slice";

export function ExpenseInput(props) {
  const dispatch = useDispatch();

  function submit(e) {
    dispatch(addExpense());
  }
}
```

## Manipuler les données

Envoyer des données à notre action et les manipuler depuis celle-ci.

```js
// Envoi
const name = 'test';
const price = 3;
dispatch(addExpense(name, price));

// Réception
export const expenseSlice = createSlice({
  reducers: {
    addExpense: (currentSlice, action) => {
      console.log(action.payload.name, action.payload.price);
    },
  },
});
```

Dans notre action, il y a plusieurs informations utiles, ici nos données envoyées en argument sont disponible dans `payload`.

## Les composants qui deviennent spécifique

En règle général les composants sont réutilisable et doivent être le plus possible générique. Il arrive toutefois qu'un composant devienne moins générique et soit très spécifique à une action de notre app et par la même occasion connecté à notre store. Dans c'est cas là, il est bien de les dissocier, pour cela, nous pouvons les placer dans un dossier à part qui pourrait se nommer `containers` pour donner l'indication à tout le monde que ces composants ne sont pas générique et qu'ils sont connecté à notre store et qu'il faut probablement faire attention à la réutilisation de ceux-là.

## Lire dans notre store

Pour lire dans notre store, il va nous falloir un nouvel hook qui est `useSelector` qui donne accès à un callback.

```js
import { useSelector } from "react-redux";

export function App() {
  const expenseList = useSelector((store) => store.EXPENSE.expenseList);
}
```

Comme pour le state natif de REACT à chaque changement de cette donnée, le composant sera re-render.

## Persister le store en local

Pour une application qui n'a que du front et pas de back il peut être intéressant de persister les données sur le navigateur de l'utilisateur en local storage (attention tout de même, cette donnée est régulièrement supprimé par les utilisateurs lors de nettoyage du cache, etc...).

Pour mettre en place cette persistance de donnée, nous allons utiliser la librairie Redux-persist.

```shell
npm i redux-persist
```

Nous allons modifier la structure de notre store pour permettre la persistance local de celui-ci.

```js
// Ajout d'import
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

// Ajout de plusieurs configurations
// On combine tous nos reducers
const rootReducers = combineReducers({
  EXPENSE: expenseSlice.reducer,
});
// On persist nos reducers
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const persistedReducers = persistReducer(persistConfig, rootReducers);

// Modification de notre store
const store = configureStore({
  reducer: persistedReducers,
});

const persistor = persistStore(store);
export { store, persistor };
```

Il faut également modifier légèrement l'index.js racine de notre app.

```js
// Ajout d'import
import { store, persistor } from "store";
import { PersistGate } from "redux-persist/integration/react";

// Modification de notre render principal
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
```

Avec cette librairie redux persist lit les objets d'une autre manière et donc il va falloir les ignorer dans la configuration de notre store pour ne pas avoir d'erreur gênante.

```js
// Ajout d'import
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Ajout d'un middleware à notre store
const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
```

Dans la configuration de persist, on peut mettre en place une whitelist ou une blacklist pour empêcher la persistance d'autre slice.

```js
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["EXPENSE"],
  blacklist: [],
};
```

## Les middlewares

C'est une fonction qui va permettre de ce mettre en écoute sur tout ce qui se passe sur Redux, on va pouvoir se mettre en écoute sur des actions et venir y apporter une logique supplémentaire à notre application sans avoir besoin de la dupliquer partout où il y a ces actions à écouter. Pour être vulgaire, c'est un écouteur d'événement.

Tout d'abord, il faut modifier notre store pour lui indiquer notre middleware.

```js
const store = configureStore({
  reducer: {
    EXPENSE: expenseSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).prepend(loggerMiddleware.middleware),
});
```

Création de notre middleware.

```js
import { createListenerMiddleware } from "@reduxjs/toolkit";

export const loggerMiddleware = createListenerMiddleware();

loggerMiddleware.startListening({
  predicate: (action) => {
    return action.type === "expenseSlice/addExpense" || action.type === "expenseSlice/setIncome";
  },
  effect: async (action, listenerAPI) => {
    // Code
  },
});
```

`predicate` permet de spécifier quelles actions écouter, `effect` va être la logique que l'on va jouer lors de l'écoute.

On peut remplacer le predicate qui est complexe à écrire par une autre fonction plus simple.

```js
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { addExpense, incrementCountActionPerformed, setIncome } from "store/expense/expense-slice";

export const loggerMiddleware = createListenerMiddleware();

loggerMiddleware.startListening({
  matcher: isAnyOf(addExpense, setIncome),
  effect: async (action, listenerAPI) => {
    listenerAPI.dispatch(incrementCountActionPerformed());
  },
});
```
