import React from "react";
import "./App.css";
import ArrayIteration from "./containers/ArrayIteration";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ArrayIteration array={[1, 2, 3, 4, 5]} />
      </header>
    </div>
  );
}

export default App;
