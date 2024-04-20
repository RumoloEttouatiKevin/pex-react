# Projet 3 - Tv Show Adviser

## Générer et gérer une erreur JS

Ici il n'est pas question de React, mais purement de JS (on révise nos basique !)

```js
function division(a, b) (
  if (b === 0)  {
    throw new Error("Pas de division par zéro !");
  }

  return a / b;
)
try {
  const result = division(1, 0);
} catch (error) {
  console.log(error.name, error.message);
}
```

## Les promises JS

Et oui, on révise encore un peu, React n'est rien de plus que du JS et les fondamentaux sont toujours nécessaire.

Une promise permet de gérer les opérations qui prennent du temps.

```js
function genereGrandRandom(success, error) {
  setTimeout(() => {
    const rand = Math.random().toFixed(2);
    if (random > 0.5) {
      success("Succès, grand random : " + rand);
    } else {
      error("Échec, petit random : " + rand);
    }
  }, 2000);
}

const promesse = new Promise(genereGrandRandom);

promesse
  .then((responseSuccess) => {
    console.log("Réponse positive ", responseSuccess);
  })
  .catch((responseError) => {
    console.log("Réponse négative ", responseError);
  });
```

## Le hook useEffect

L'utilisation de **useEffect()** est très utile pour gérer comment nous souhaitons lancer une série d'opérations qu'une seule fois au premier rendu du composant ou uniquement si une valeur change.

```js
// Exécution du code qu'une seule fois après le premier render
useEffect(() => {
  // Code
}, []);

// Exécution du code après le premier render puis à chaque fois qu'une des valeurs sélectionnés est modifié
useEffect(() => {
  // Code
}, [unState, uneVariable, uneProps]);
```

Attention au fait que **useEffect()** retourne une fonction, mais ne peut pas retourner une fonction asynchrone.

Avec le **useEffect()** il est également possible d’exécuter du code une seule fois au moment où le composant est retiré du DOM.

```js
useEffect(() => {
  // Code

  return () => {
    // Code exécuté quand le composant est retiré du DOM
  }
}, [val1, val2]);
```

Il est important de prendre en compte que si nous avons des timeout ou tout autre objet tournant en boucle dans un **useEffect()**, le fait d'utiliser la fonction de nettoyage avec le **return** est très importante, React est suffisamment intelligent pour faire de l’auto-nettoyage au moment où un composant est retiré du DOM, mais il ne gère pas les fonctions de type boucle.

```js
useEffect(() => {
  const intervalId = setInterval(() => {
    console.log("Requête HTTP...");
  }, 1000)

  return () => {
    clearInterval(intervalId);
  };
}, []);
```

Il est important de noter également que cette fonction de nettoyage avec le **return** est exécuté à chaque fois que le **useEffect** est de nouveau jouer, si s'est le premier rendu du composant pas d'exécution du return, si le **useEffect** est rejouer, ça va d’abord lancer le **return** du précédent **useEffect()** puis ensuite lancer le **useEffect()** demandé.

## Utiliser des assets

Pour utiliser des images, des polices ou autres éléments importés, nous pouvons les importer dans notre dossier **src/**, lors du build de l'application React avec npm s'occupera de construire proprement l'application avec les éléments importés dans le dossier build.

```js
import logo from "./assets/images/logo.png";

export function Toto() {
  // code

  return (
    <>
      <img src={logo} />
    </>
  )
}
```

## Strict Mode

C'est un composant qui va agir uniquement en environnement de dev, la petite particularité est que ça va lancer deux fois les useEffect au démarrage d'un composant, ce mode est principalement là pour détecter les éventuels bugs et comportements obsolètes de l'application.

Le StrictMode peut être activé pour toute l'application ou pour une petite partie seulement.

```js
// À la racine `index.js`
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// À une partie ciblée
function App() {
  return (
    <>
      <Header />
      <StrictMode>
        <main>
          <Sidebar />
          <Content />
        </main>
      </StrictMode>
      <Footer />
    </>
  );
}
```

Lire la documentation à ce sujet : [StrictMode](https://react.dev/reference/react/StrictMode#strictmode)
