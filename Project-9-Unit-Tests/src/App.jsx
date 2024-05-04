import { Calculator } from "components/Calculator/Calculator";
import { RandomUser } from "components/RandomUser/RandomUser";
import s from "./App.module.css";

export function App() {
  return (
    <div className={s.root}>
      <Calculator />
      <RandomUser />
    </div>
  );
}
