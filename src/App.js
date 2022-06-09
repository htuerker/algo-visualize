import React from "react";
import "./App.css";
import ArrayIteration from "./containers/ArrayIteration";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>Forward Array Iteration:</div>
        <ArrayIteration color="green" />
        <div>Reverse Array Iteration:</div>
        <ArrayIteration reverse={true} color="red" />
      </header>
    </div>
  );
}

export default App;
