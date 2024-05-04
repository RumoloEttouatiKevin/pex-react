# Projet 9 - Les tests unitaires

## Jest

Jest écoute tous les fichiers qui ont doit l'extension `.test.js` ou tous les fichiers `.js` qui sont dans le dossier `src/text`.

A chaque fois qu'un de ces fichiers change, les tests sont relancés si nous avons lancé les tests avec `npm run test`.

Les tests ont tous la même syntaxe de base. Nous avons la fonction `describe()` qui prend deux paramètres (nom de l'ensemble de tests, fonction) qui est une suite et qui va comporter plusieurs tests avec la fonction `it()` qui prend également deux paramètres (nom de l'ensemble de tests, fonction).

```js
describe("TodoList tests", () => {
  it("Ajoute une todo", () => {
    // Test
  });
  it("Supprime une todo", () => {
    // Test
  });
});
```

Nous pouvons ajouter des assertions à nos tests.

```js
it("Supprime une todo", () => {
  expect(true).toBe(true);
});
```

On peut tester les erreurs lancées par JS.

```js
expect(() => divide()).toThrowError("You can't divide by 0");
```

## Tester des composants React avec React Testing Library

Pour tester les composants React avec Jest, il nous faut principalement `render` et `screen` de RTL et bien sur le composant que l'on va tester.

```js
import { render, screen } from "@testing-library/react";
import { Calculator } from "components/Calculator";
```

`render` permet de spécifier que le test Jest ne se fera que sur le composant qu'on lui fournit et tout le reste sera ignoré.

```js
describe("<Calculator />", () => {
  it("has 'Calculator' displayed somewhere", () => {
    render(<Calculator />);
  });
});
```

`screen` va nous permet de récupérer des éléments du DOM et de pouvoir populer nos tests, mais aussi de pouvoir debuger nos tests.

```js
// getByText() pour récupérer le premier élément qui contient ce texte.
it("has 'Calculator' displayed somewhere", () => {
  render(<Calculator />);
  const textElement = screen.getByText("Calculator");
  expect(textElement.textContent).toBe("Calculator");
});

// getByRole() pour récupérer un élément par ça balise
it("has an h1 that contains 'Calculator'", () => {
  render(<Calculator />);
  const titleEl = screen.getByRole("header", { level: 1 });
  expect(titleEl.textContent).toBe("Calculator");
});

// Pour voir le rendu utilisé
screen.debug();

// Pour voir un élément sélectionné
screen.debug(textElement);
```

`beforeEach()` permet d'exécuter du code avant chaque cas de test d'un groupe de test.

```js
describe("<Calculator/>", () => {
  beforeEach(() => {
    render(<Calculator />);
  });

  it("has 'Calculator' displayed somewhere", () => {
    const textElement = screen.getByText("Calculator");
    expect(textElement.textContent).toBe("Calculator");
  });
});
```

Ici, faire un render dans le `beforeEach()` n'est pas une bonne pratique d'après ESLint, mais c'est pour imager le fait de pouvoir exécuter une logique avant chaque test.

Il existe plusieurs hooks de ce style pour appliquer des règles avant ou après les tests.

`getByTestId()` va nous permettre de récupérer un élément par son ID de test, nous pouvons utiliser un dataset spécifique aux tests qui ne sera plus présents au moment du build de l'application.

```js
// Composant
<input
  data-testid="inputA"
  type="number"
  value={inputValueA}
  onChange={(e) =>
    setInputValueA(e.target.value ? Number.parseInt(e.target.value) : "")
  }
/>

// Test
it("performs 0+0 by default", () => {
  render(<Calculator />);
  const inputA = screen.getByTestId("inputA").value;
  expect(inputA).toBe("0");
});
```

Il est important de noter que dans un test, il ne faut pas `render` plusieurs fois le même composant, sinon Jest lancera une erreur.

## Simuler des interactions utilisateur

Nous utilisons `fireEvent` de RTL pour simuler les interactions utilisateur. Pour simuler un changement dans nos input, nous utiliserons la fonction `change` de `fireEvent`.

```js
fireEvent.change(screen.getByTestId("inputA"), { target: { value: 3 } });
```

## Lancer un seul test d'une suite de tests

On peut utiliser la fonction `.only()` pour ne lancer que ce test et skip tous les autres.

```js
it.only("displays an error when we divide by 0", () => {
  render(<Calculator defaultA={0} defaultB={0} defaultOperator={"/"} />);
  const { getResult } = getCalculator();

  expect(getResult()).toBe("You can't divide by 0");
});
```

## Connaître la couverture de code de nos tests

Pour connaître le taux de couverture de nos tests, nous utilisons le `code coverage`.

Dans notre `package.json` il faut ajouter une commande.

```json
  "scripts": {
    // "start": "react-scripts start",
    // "build": "react-scripts build",
    // "test": "react-scripts test --watchAll",
    "test:cov": "react-scripts test --watchAll=false --coverage",
    // "eject": "react-scripts eject"
  },
```

En lançant la commande `npm run test:cov` tous les tests seront exécuté et nous aurons un joli tableau récapitulant les pourcentages des fichiers, des states, des functions, des lignes couvertes par nos tests. Nous avons également une information très importante, ce sont les lignes où nos tests ne sont pas passés.

## Tester des composants avec des requêtes asynchrone

Pour récupérer un élément qui peut être asynchrone, nous utiliserons `findByRole()` au lieu de `getByRole()`, `findByText()` au lieu de `getByText()`, etc... Ceci nous permet d'attendre un lapse de temps avant de retourner une erreur.

```js
describe("<RandomUser/>", () => {
  it("loads user when clicking on the button", async () => {
    render(<RandomUser />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    const titleEl = await screen.findByRole("Larry Morales");
  });
});
```

Le petit problème avec les requêtes asynchrone, c'est qu'on fait potentiellement un appel à une API et que la donnée en retour peut être variable. C'est là qu'entre en jeu les Mock.

L'utilisation des mock, nous permet de simuler des requête et d'avoir un retour de donnée prédéfini.

```js
import { fireEvent, screen, render } from "@testing-library/react";
import { RandomUser } from "components/RandomUser/RandomUser";
import axios from "axios";
jest.mock("axios");

describe("<RandomUser/>", () => {
  it("loads user when clicking on the button", async () => {
    render(<RandomUser />);
    axios.get.mockResolvedValueOnce({ data: MOKE_USER_RESPONSE });
    const button = screen.getByRole("button");
    fireEvent.click(button);
    const titleEl = await screen.findByText("Larry Morales");
    screen.debug(titleEl);
  });
});

const MOKE_USER_RESPONSE = {
  results: [
    {
      gender: "male",
      // Autre résultat
    },
  ],
  info: { seed: "9381afd9dbe05396", results: 1, page: 1, version: "1.4" },
};
```

Ici, Jest va mocker axios et nous donner accès une fonction qui va intercepter la requête axios à venir et l'empêcher de faire un vrai appel et nous retourner à la place la donnée qu'on lui aura fourni.

Dans ce cas, il faut penser à checker qu'axios fonction bien avec Jest, il faut les lignes suivantes dans le package.json

```json
"jest": {
  "moduleNameMapper": {
    "^axios$": "axios/dist/node/axios.cjs"
  }
}
```
