# Projet 5 - React-Router - Note Manager

## React router

Pour naviguer avec react on utilise généralement react router qui va nous permettre de naviguer facilement de page en page et de créer une SPA (Simple Page Application).

```shell
npm i react-router-dom@6.3.0
```

Nous allons créer nos premières pages simple pour tester le comportement, il faut savoir qu'une page est tout simplement un composant REACT, notre router à l'aide va interpréter la route demandée et appeler le composant qui lui est lié.

La bonne pratique est de positionner les pages de notre application dans un dossier `pages/` et comme pour les composants, nous aurons autant de dossier de composant que de page.

Pour mettre en place notre router, nous allons apporter des modifications à l'index.js de la racine.

```js
// Ajout d'import
import { BrowserRouter, Routes, Route } from "react-router-dom";

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NoteBrowse />} />
          <Route path="/note/:id" element={<Note />} />
          <Route path="/note/new" element={<NoteCreate />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
```

Ici, en fonction de l'url un composant sera donc appelé.

Si nous voulons avoir un composant parent de tous pour imaginer avoir un header qui soit toujours présent quoi qu'il arrive, nous pouvons mettre en place une "route" parente qui fera de render du header et qui appellera le composant demandé en fonction de l'url.

```js
// index.js
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<NoteBrowse />} />
            <Route path="/note/:id" element={<Note />} />
            <Route path="/note/new" element={<NoteCreate />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

// App.jsx
import { Outlet } from "react-router-dom";

export function App() {
  return (
    <div>
      React Redux Starter :-)
      <Outlet />
    </div>
  );
}
```

Ici, le composant App aura accès aux routes via et le composant de la route demandé par l'url sera inséré à la place de `<Outlet />`.

## json-server

Pour simuler un backend, nous pouvons utiliser la librairie json-server qui va nous générer des endpoints facilement. Il faut noter que c'est une librairie qui fonctionne de manière globale à l'environnement et non pas uniquement à notre projet.

```shell
npm i -g json-server
```

Il faut maintenant créer un fichier à la racine du projet `db.json`. Ce fichier fera office de base de données et de simuler notre faux backend.

```json
{
  // Chaque élément de notre objet simulera une route de ce même nom.
  "notes": [
    {
      "id": 1,
      "title": "Test",
      "content": "Description",
      "created_at": "01/01/22"
    }
  ]
}
```

On va démarrer notre json server. Attention par défaut le serveur se lance sur la port 3000, mais notre app avec `npm start` également, il faut donc préciser sur quel port le lancer.

```shell
json-server --watch db.json -p 3200
```

Ce que l'on peut faire pour notre environnement de dev et pour nous faciliter la vie, c'est d'ajouter la commande de lancement à nos script npm.

```json
// package.json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "dev-server": "npx json-server --watch db.json -p 3200"
  },
```

```shell
npm start
npm run dev-server
```

## Naviguer avec React router

Pour naviguer, nous avons accès à un nouveau hook `useNavigate`. Il nous suffit d'appeler la route que l'on souhaite atteindre avec un onClick.

```js
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

return (
  <ButtonPrimary onClick={() => navigate("/note/new")}>
    Add note +
  </ButtonPrimary>
);
```

## Les routes paramétriques

Définition d'une route paramétrique.

```js
<Route path="/note/:noteId" element={<Note />} />
```

Pour récupérer l'information, nous utilisons `useParams`.

```js
import { useParams } from "react-router-dom";

export function Note(props) {
  const { noteId } = useParams();

  console.log(noteId);
}

```

## Récupérer une donnée précise de notre store

```js
const note = useSelector((store) =>
  store.NOTE.noteList.find((note) => note.id === noteId)
);
```

Attention au typage de comparaison.

## Récupérer les données passées en GET

```js
// http://localhost:3000/note/2?test=blob
import { useSearchParams } from "react-router-dom";

export function Note(props) {
  const [ searchParams ] = useSearchParams();

  console.log(searchParams.get("test"));
}
```

## Créer un lien avec react-router

```js
import { Link } from "react-router-dom";

<Link to="/note/new">mon lien</Link>
```
