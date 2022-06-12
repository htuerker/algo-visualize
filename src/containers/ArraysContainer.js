import React, { useState } from "react";
import IterableArray from "../components/IterableArray";
import useHighlightArray from "../state/hooks/useHighlightArray";
import { simpleArrayIteration, bubbleSort, mergeSort } from "../utils";

const ArraysContainer = () => {
  const { array, highlights, methods } = useHighlightArray({
    initialArray: [6, 5, 12, 10, 9, 1],
  });
  const [displayText, setDisplayText] = useState("");
  const [tempElement, setTempElement] = useState(null);
  const [swapCount, setSwapCount] = useState(0);
  const [stepCount, setStepCount] = useState(0);
  const increaseStep = () => setStepCount((prevState) => prevState + 1);
  const increaseSwap = () => setSwapCount((prevState) => prevState + 1);
  const [speed, setSpeed] = useState(100);

  const handleBubbleSort = (event) => {
    event.preventDefault();
    setSwapCount(0);
    setStepCount(0);
    const options = {
      speed,
      increaseSwap: () => {
        setSwapCount((prevState) => prevState + 1);
      },
      increaseStep: () => {
        setStepCount((prevState) => prevState + 1);
      },
    };

    bubbleSort({ array, methods, ...options });
    console.log("hello");
  };

  const handleBubbleSortReverse = (event) => {
    event.preventDefault();
    setSwapCount(0);
    setStepCount(0);
    const options = {
      speed,
      compareFunction: (a, b) => a < b,
      increaseSwap,
      increaseStep,
    };
    bubbleSort({ array, methods, ...options });
  };

  const handleMergeSort = (event) => {
    setDisplayText("Merge Sort Started");
    event.preventDefault();
    const options = {
      speed,
      tempElement,
      setTempElement,
      setDisplayText,
      increaseStep,
      increaseSwap,
    };
    mergeSort({ array: [...array], methods, options });
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
      margin: "auto",
      width: 300,
      padding: 10,
    },
  };

  return (
    <div>
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
        <button style={styles.button} onClick={handleMergeSort} type="submit">
          Merge Sort
        </button>
        <label style={{ padding: 10 }} htmlFor="input-speed">
          Speed: {speed}ms
          <input
            onChange={handleSpeedChange}
            id="input-speed"
            type="range"
            min="100"
            max="2000"
          />
        </label>
        <IterableArray elements={array} highlights={highlights} />
        <div>
          Swap: {swapCount} &nbsp; Step: {stepCount} &nbsp; Temp: {tempElement}
        </div>
        <div>{displayText}</div>
      </div>
    </div>
  );
};

export default ArraysContainer;
