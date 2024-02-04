// import { Greetings } from "./Greetings";
// import { AgeCounter } from "./AgeCounter";


// import { Car } from "./Components/Car/Car";
// import { Greetings } from "./Components/Greetings/Greetings";
// import "./global.css";

import { Bus } from "./Components/Bus/Bus";

export function App() {
  // const sizeHeight = true;

  function hello(number) {
    alert("Hello de <App /> " + number);
  }

  return (
    <>
      {/* <h1>Hello to the React world</h1>
      <Greetings
        firstName={"Rachel"}
        age={50}
        car={{ color: "red", speed: 300 }}
        doSomething={function () {
          console.log("Hello");
        }}
        isSunny
      >
        <img src="https://a.storyblok.com/f/216574/152x38/60dc8632b2/kickflip-full-logo.svg" alt="" />
      </Greetings> */}
      {/* <AgeCounter /> */}
      {/* <div
        style={{
          backgroundColor: "red",
          height: sizeHeight ? 100 : 200,
          width: 100,
          border: "3px solid blue",
        }}
      ></div> */}
      {/* <div>
        <Car />
        <Greetings />
      </div> */}
      <div>
        Je suis {"<App />"}
        <Bus onBusClick={hello} />
      </div>
    </>
  );
}
