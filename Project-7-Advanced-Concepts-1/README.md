# Projet 7 - Advanced Concepts 1

## Les contextes

Les contextes sont un peu comme ce que l'on faisait avec Redux (c'est très vulgaire, mais c'est pour imager), nous allons pouvoir utiliser une valeur globale à l'application de n'importe où sans avoir besoin de faire descendre en props d'enfant en enfant.

Pour définir un contexte, nous pouvons les ranger dans un dossier et nous utilisons le hook `createContext()` pour l'initialiser avec une valeur.

```js
import { createContext } from "react";

export const ThemeModeContext = createContext("light");
```

Un contexte s'utilise avec un state.

```js
import { useContext, useState } from "react";=
import { ThemeModeContext } from "./contexts/ThemeModeContext";

export function App() {
  const initialThemeMode = useContext(ThemeModeContext);
  const [themeMode, setThemeMode] = useState(initialThemeMode);

  return <></>;
}
```

Pour donner accès au contexte à tous les enfants d'un composant, il faut préciser contexte et le "fournir" via un Provider.

```js
import { useContext, useState } from "react";
import { Level1 } from "./components/Level1";
import { ThemeModeContext } from "./contexts/ThemeModeContext";

export function App() {
  const initialThemeMode = useContext(ThemeModeContext);
  const [themeMode, setThemeMode] = useState(initialThemeMode);

  return (
    <ThemeModeContext.Provider value={{ themeMode, setThemeMode }}>
      <div style={{ color: "", backgroundColor: "" }}>
        <Level1 />
      </div>
    </ThemeModeContext.Provider>
  );
}
```

Pour accéder au contexte dans un enfant, nous utilisons aussi le hook `useContext()`.

```js
import { useContext } from "react";
import { ThemeModeContext } from "../contexts/ThemeModeContext";

export function Level5(props) {
  const { themeMode, setThemeMode } = useContext(ThemeModeContext);

  function toggleThemeMode() {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  }

  return (
    <>
      <div>Niveau de profondeur 5</div>
      <button onClick={toggleThemeMode}>
        Changer le mode vers {themeMode === "light" ? "dark" : "light"}
      </button>
    </>
  );
}
```

## Quand utiliser Redux ou Contexts

C'est un bien grand débat, j'aurais tendance à dire que pour l'utilisation d'une donnée simple et dans peu de composants, un contexte est bon, mais pour l'utilisation de donnée plus complexe, il faut peut-être utiliser Redux.
La réponse est surtout une question d'architecture de projet et il faut toujours se poser la question de performance, si un contexte est mis à jour, tous les composants utilisant ce contexte seront re-render, à l'inverse avec Redux seul les composants utilisant la valeur changeante seront re-render.
