import ReactDOM from "react-dom/client";
import { App } from "./App";

const divRoot = document.getElementById("root");

const reactRoot = ReactDOM.createRoot(divRoot);

reactRoot.render(<App />);
