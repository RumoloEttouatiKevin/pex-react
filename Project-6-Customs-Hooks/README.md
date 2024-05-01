# Projet 6 - Customs Hooks

## Créer un hook custom

Par convention, on créé un dossier `hooks` où nous y mettrons tous nos hooks customs.

Un hook n'est n'y plus n'y moins qu'une fonction jsx. À l'inverse d'un composant, il peut retourner tout autre chose qu'un rendu du DOM.

```js
import { useEffect, useState } from "react";

export function useScrollPosition() {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const listener = window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  function handleScroll() {
    setIsBottom(
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeights
    );
  }

  return { isBottom };
}
```

## Utilisation du hook

Comme pour les hooks, l'utilisation se fait généralement via une constante.

```js
const { isBottom } = useScrollPosition();
```
