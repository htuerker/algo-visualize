import React, { useState } from "react";
import IterableArray from "../components/IterableArray";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const simpleArrayIteration = async (container, dispatch, speed = 1000) => {
  for (let i = 0; i < container.elements.length; i++) {
    dispatch({
      ...container,
      options: { highlight: i },
    });
    await wait(speed);
  }
};

const ArrayIteration = ({ array = [] }) => {
  const [container, setContainer] = useState({
    options: {},
    elements: array,
  });
  return (
    <div>
      <header>Simple Array Iteration</header>
      <button onClick={() => simpleArrayIteration(container, setContainer)}>
        Run
      </button>
      <IterableArray
        elements={container.elements}
        highlight={container.options.highlight}
      />{" "}
    </div>
  );
};

export default ArrayIteration;
