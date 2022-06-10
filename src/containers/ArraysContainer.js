import React from "react";
import IterableArray from "../components/IterableArray";
import useHightlightArray from "../state/hooks/useHighlightArray";
import { simpleArrayIteration, swapValues, bubbleSort } from "../utils";

const ArraysContainer = () => {
  const { array, highlights, methods } = useHightlightArray({
    initialArray: [5, 4, 3, 2, 1],
  });

  const [speed, setSpeed] = React.useState(100);

  const handleBubbleSort = (event) => {
    event.preventDefault();
    const options = {
      speed,
    };
    bubbleSort({ array, methods, ...options });
  };

  const handleBubbleSortReverse = (event) => {
    event.preventDefault();
    const options = {
      speed,
      compareFunction: (a, b) => a < b,
    };
    bubbleSort({ array, methods, ...options });
  };

  const handleForwardIteration = (event) => {
    event.preventDefault();
    const options = {
      speed,
    };
    simpleArrayIteration({ array, methods, ...options });
  };

  const handleBackwardIteration = (event) => {
    event.preventDefault();
    const options = {
      speed,
      reverse: true,
      color: "red",
    };
    simpleArrayIteration({ array, methods, ...options });
  };

  const handleSpeedChange = (event) => {
    event.preventDefault();
    const value = parseInt(event.target.value);
    if (typeof value === "number" && value > 0 && value <= 2000) {
      setSpeed(event.target.value);
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
    },
    button: {
      padding: 10,
    },
  };

  return (
    <>
      <div style={styles.container}>
        <button style={styles.button} onClick={handleForwardIteration}>
          Forward Iteration
        </button>
        <button style={styles.button} onClick={handleBackwardIteration}>
          Backward Iteration
        </button>
        <button style={styles.button} onClick={handleBubbleSort} type="submit">
          Bubble Sort
        </button>
        <button
          style={styles.button}
          onClick={handleBubbleSortReverse}
          type="submit"
        >
          Bubble Sort Reverse
        </button>
        <label style={styles.button} htmlFor="input-speed">
          Speed: {speed}ms
          <input
            onChange={handleSpeedChange}
            id="input-speed"
            type="range"
            min="100"
            max="2000"
          />
        </label>
      </div>
      <IterableArray elements={array} highlights={highlights} />
    </>
  );
};

export default ArraysContainer;
