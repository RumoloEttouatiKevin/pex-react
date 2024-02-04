# Projet 2 - Sélectionneur de difficulté

## Re-render le composant à l'update du state

Le composant est automatiquement re-render si un state lui étant lié est mis à jour

```js
export function MenuListItem(props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        backgroundColor: isHovered ? "#a5e9ff" : "#eff0ef",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Set to : {props.difficulty}
    </div>
  );
}
```

Ici le state est mis à jour quand la souris entre ou sort de l'élément, ce qui entraîne le re-render du composant.

## Utiliser un state dans plusieurs composants

Pour utiliser simplement une même valeurs dans plusieurs composants et donc de les re-render au changement de celle-ci, nous utilisons un state placé dans un composant parent

```js
export function App() {
  const [currentDifficulty, setCurrentDifficulty] = useState("");

  return (
    <div>
      <MenuList difficulty={currentDifficulty} />
      <DisplayDifficulty difficulty={currentDifficulty} />
    </div>
  );
}
```

Ici le composant **App** sera re-render à chaque mise à jour du state **currentDifficulty** ce qui entraînement également le re-render de nos deux composants qui utilisent ce state

## Modification d'un state par un élément enfant

Un state ne peut être modifié que par son propre composant, pour que l'enfant puisse effectuer une modification il faut passer par une fonction de callback

```js
export function App() {
  const [currentDifficulty, setCurrentDifficulty] = useState("");

  function updateDifficulty(difficulty) {
    setCurrentDifficulty(difficulty);
  }

  return (
    <div>
      <MenuList
        onItemClick={updateDifficulty}
        difficulty={currentDifficulty}
      />
      <DisplayDifficulty difficulty={currentDifficulty} />
    </div>
  );
}
```

## Déstructurer les props

Les props passé à un composant peuvent être déstructuré pour avec une meilleur lisibilité du code et eviter de passer pas l'élément **props**

```js
// Avant
export function MenuList(props) {

// Après
export function MenuList({ difficulty, onItemClick }) {
```

## Tableaux et boucles

Avec React il est facile d'afficher un tableau de plusieurs éléments

```js
export function DisplayColor(props) {
  const colors = ["Red", "Blue", "Green"];

  return <div>{colors}</div>;
}
```

Ici nous affichons **RedBlueGreen**

React affichera automatiquement tous les éléments d'un tableau quand il est appelé, à condition qu'il puisse l'interprété, si par exemple un des éléments du tableau est un objet, React lèvera une erreur.

Le gros intérêt de pouvoir "boucler/afficher" un tableau avec cette syntax ce porte sur l'affichage de plusieurs l'éléments JSX

```js
export function DisplayColor(props) {
  const colors = ["Red", "Blue", "Green", "yellow"];

  const squareList = [];

  for (const color of colors) {
    squareList.push(
      <div style={{ height: 100, width: 100, backgroundColor: color }} />
    );
  }

  return <div>{squareList}</div>;
}
```

Ici nous affichons quatre **div** généré via une liste de couleur

## map() une fonction ES6 très utile

La fonction **map()** permet de générer un nouveau tableau depuis un premier en y modifiant les éléments via une fonction de callback

```js
const name = [
  { name: "Harry" },
  { name: "Lisa" },
  { name: "John" }
];

const result = name.map((currentItem, currentIndex) => {
  return { name: currentItem.name + " Potter" };
});
```

Ici le tableau **result** sera `[{name: "Harry Potter"}, {name: "Lisa Potter"}, {name: "John Potter"}]`

Pour une question de lisibilité on peut externaliser la fonction de traitement du **map()**

```js
const name = [{ name: "Harry" }, { name: "Lisa" }, { name: "John" }];

function appendPotterToName(item) {
  return { name: item.name + " Potter" };
}

const result = name.map(appendPotterToName);
```

## Clés des éléments d'un tableau

Lorsque nous affichons les éléments d'un tableau et plus particulièrement uns série d'élément JSX, React a besoin que chacun des éléments comporte une clé unique pour pouvoir les identifier facilement lors de différent évènement qui pourrait se produire sur les éléments

Avec map il est facile de fournir une clé unique à l'affichage d'un tableau

```js
export function NameList(props) {}
  const name = [{ name: "Harry" }, { name: "Lisa" }, { name: "John" }];

  return (
    <>
      {name.map((currentItem, currentIndex) => (
        <div key={currentIndex}>{currentItem.name + " Potter"}</div>
      ))}
    </>
  )
}
```
