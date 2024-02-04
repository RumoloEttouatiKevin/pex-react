# Projet 1 - Introduction

## Créer un nouveau projet avec la librairie create-react-app

Avec npx et cette librairie nous allons créer un nouveau projet react en partant de zéro.

- `npx create-react-app my-app-name`

La documentation officielle de la librairie [create-react-app](https://create-react-app.dev/)

## Installer un projet existant

- `npm install`

## Lancer le projet en serveur de dev

- `npm start`

## Importer les outils React à la racine de notre projet

Dans le fichier index.js

```js
import ReactDOM from "react-dom/client";
```

## Cibler la div du point d'entrée de notre SPA (Single Page Application)

```js
const divRoot = document.getElementById("root");
```

## Instancier notre nœud de DOM virtuel en utilisant notre div root

```js
const reactRoot = ReactDOM.createRoot(divRoot);
```

## Création de notre premier composant qui sera le composant racine

Dans le dossier `src` créer le fichier `App.jsx`, **jsx** est l'extension pour les composants React.

## Notre composant

Un composant React est généralement une fonction, dans les anciennes version on utilisé majoritairement des classes.

Pour pouvoir utiliser ce composant depuis notre racine **index.js**, cette fonction doit être exportable.

```js
export function App() {
  return "Hello";
}
```

## Import de notre composant

Pour pouvoir utiliser notre composant, il faut l'importer.

```js
import { App } from "./App";
```

## Injecter notre composant racine en tant que rendu HTML

```js
reactRoot.render(<App />);
```

## Les rendus

Avec React, on utilise la syntaxe **JSX** qui est un mélange de **JS** et de **HTML**, on peut également faire le rendu directement sur une chaîne de caractère ou un nombre.

```js
// String
return "Toto";

// Integer
return 2;

// JSX d'une seule balise
return (
  <input type="text" />
)

// JSX de plusieurs balise avec l'utilisation d'un "fragment", obligatoire pour englober plusieurs éléments HTML et éviter une div inutile.
return (
  <>
    <input type="text" />
    <button>Click</button>
  </>
)
```

Vulgairement appelé balise HTML dans le code JSX, mais ce sont des composants.

## Appel d'un composant dans un composant

Un composant peut être rendu par un autre composant, il suffit alors de l'importer dans le composant où il est instancié.

```js
import { Greetings } from "./Greetings";

export function App() {
  return (
    <Greetings />
  )
}
```

## Les props

Les props sont là pour fournir des données à nos éléments enfant, la donnée peut être de différentes formes, elle est fournie comme attribut de la balise du composant appelé.

```js
// Fournir la donnée
return (
  <Greetings
    firstName={"Rachel"}
    age={30}
    car={{ color: "red", speed: 300 }}
    doSomething={function () {
      console.log("Hello");
    }}
    image={
      <img src="https://a.storyblok.com/f/216574/152x38/60dc8632b2/kickflip-full-logo.svg" alt="" />
    }
  />
)

// Interpréter la donnée
export function Greetings(props) {
  return (
    <ul>
      <li>Hello {props.firstName}</li>
      <li>your are {props.age} years old</li>
      <li>{props.image}</li>
    </ul>
  );
}
```

Une props est read only, il n'est pas possible de la modifier.

## Children

Une autre forme de props est de fournir cette "donnée" comme enfant du composant entre les balises du composant.

```js
// Fournir la donnée
return (
  <Greetings>
    <img src="https://a.storyblok.com/f/216574/152x38/60dc8632b2/kickflip-full-logo.svg" alt="" />
  </Greetings>
)

// Interpréter la donnée
return (
  <ul>
    <li>{props.children}</li>
  </ul>
);
```

## Conditional rendering

Le gros avantage de React est de pouvoir facilement modifier le rendu en fonction d'une valeur qui peut être dynamique.

```js
export function Greetings(props) {
  if (props.age > 100) {
    return <p>Tu es pas tout jeune</p>;
  } else {
    return (
      <li>Hello {props.firstName}</li>
    );
  }
}
```

## Props boolean raccourci

Il est possible de raccourcir un boolean qui est par défaut à true.

```js
// Version complète
<Greetings
  isSunny={true}
/>

// Version raccourci
<Greetings
  isSunny
/>

// Utilisation
<li>{props.isSunny && "Il fait beau"}</li>
```

## Conditionnement du rendu d'un composant

Il est facile de conditionner le rendu d'un composant ou d'un autre.

```js
export function Greetings(props) {
  return (
    <li>{props.isSunny ? <ItsSunny /> : <ItsRainy />}</li>
  );
}

function ItsSunny() {
  return <h1>Il fait beau</h1>;
}

function ItsRainy() {
  return <h1>Il pleut</h1>;
}
```

## States

Les states sont liés à son composant, la modification de la donnée dans le state permet de régénérer le rendu du composant et donc d'être ultra dynamique.

```js
import { useState } from "react";

export function AgeCounter(props) {
  const [age, setAge] = useState(30);

  function increaseAge() {
    setAge(age + 1);
  }

  return (
    <>
      <button onClick={increaseAge}>Increase age</button>
      <div>You are {age} years old</div>
    </>
  )
}
```

Le rerender du composant est donc effectué si une props ou le state vient à changer, ici useState est un **hook** qui permet de générer un événement.

## Le state modifiant une valeur passée en props

Ici, on a l'exemple de la modification d'une props via la modification d'un state.

```js
// AgeCounter.jsx
import { useState } from "react";
import { AgeDisplay } from "./AgeDisplay";

export function AgeCounter(props) {
  const [age, setAge] = useState(30);

  function increaseAge() {
    setAge(age + 1);
  }

  return (
    <>
      <button onClick={increaseAge}>Increase age</button>
      <AgeDisplay age={age} />
    </>
  )
}

// AgeDisplay.jsx
export function AgeDisplay(props) {
    return <div>You are {props.age} years old</div>
}
```

## Styling JSS

Le JSS est une syntaxe d'insérer du style à un élément directement en tant qu'attribut `style=""`.

```js
<div
  style={{
    backgroundColor: "red",
    height: sizeHeight ? 100 : 200,
    width: 100,
    border: "3px solid blue",
  }}
></div>
```

La syntaxe est ici un peu différente du HTML classique, il faut insérer un objet avec les valeurs CSS en camelCase. Il est également possible de conditionner le style dynamiquement.

## Styling CSS global

Utilisation d'un fichier de style CSS global et utilisation des noms de classe.

```css
/* Fichier global.css */
p {
  color: red;
}

.box {
  height: 100px;
  width: 100px;
  background-color: blue;
}

.box2 {
  border: 5px solid black;
}
```

```js
// Fichier App.jsx
import { Car } from "./Components/Car/Car";
import { Greetings } from "./Components/Greetings/Greetings";
import "./global.css";

export function App() {
  return (
    <>
      <div>
        <Car />
        <Greetings />
      </div>
    </>
  );
}

// Fichier Components/Car/Car.jsx
export function Car() {
    return <p className="box box2">Je suis une voiture</p>;
}

// Fichier Components/Greetings/Greetings.jsx
export function Greetings() {
    return <p>Salutation</p>;
}
```

## Styling CSS modules

L'utilisation de module CSS permet de ne pas avoir de conflit entre les différents nommages de classe et permet d'être unique au composant. Le fichier CSS doit comporter l'extension **.module.css**.

```css
/* Fichier Components/Greetings/style.module.css */
.box {
  height: 100px;
  width: 100px;
}

.box2 {
  color: blue;
}
```

```js
// Fichier Components/Greetings/Greetings/jsx
import s from "./style.module.css";

export function Greetings() {
    // return <p className={s.box + " " + s.box2}>Salutation</p>; Deux écritures possibles pour insérer plusieurs noms de classe depuis cet objet
    return <p className={`${s.box} ${s.box2}`}>Salutation</p>;
}
```

## Fonctions de callback

Nous pouvons lancer une fonction d'un parent depuis un enfant.

```js
// Fichier App.jsx
import { Bus } from "./Components/Bus/Bus";

export function App() {
  function hello(number) {
    alert("Hello de <App /> " + number);
  }

  return (
    <>
      <div>
        Je suis {"<App />"}
        <Bus onBusClick={hello} />
      </div>
    </>
  );
}

// Fichier Components/Bus/Bus.jsx
export function Bus(props) {
  // function onClick() {
  //   props.onBusClick(2);
  // }

  return (
    <div>
      Je suis {"<Bus />"}
      {/* <button onClick={onClick}>click</button> Plusieurs écritures possibles pour insérer un argument*/}
      <button onClick={() => props.onBusClick(2)}>click</button>
    </div>
  );
}
```
