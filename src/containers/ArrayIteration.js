import React, { useCallback, useState } from "react";
import IterableArray from "../components/IterableArray";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// highligts: [{ index: Number, color: String }]
const useHightlightArray = ({ initialArray = [], initialHighligts = {} }) => {
  const [array, setArray] = useState(initialArray);
  const [highlights, setHighligts] = useState(initialHighligts);

  const addElement = useCallback(
    (element) => {
      setArray([...array, element]);
    },
    [array]
  );

  const removeElement = useCallback(
    (index) => {
      setArray(array.filter((_, idx) => idx === index));
    },
    [array]
  );

  const addHighlight = useCallback((index, color) => {
    setHighligts((prevState) => {
      const newHash = { ...prevState };
      newHash[`${index}`] = color;
      return newHash;
    });
  }, []);

  const removeHighlight = useCallback((index) => {
    setHighligts((prevState) => {
      const newHash = { ...prevState };
      newHash[`${index}`] = null;
      return newHash;
    });
  }, []);

  const swapValues = useCallback((idx1, idx2) => {
    setArray((prevState) => {
      const newArray = [...prevState];
      const temp = newArray[idx2];
      newArray[idx2] = newArray[idx1];
      newArray[idx1] = temp;
      return newArray;
    });
  }, []);

  return {
    array,
    highlights,
    methods: {
      addElement,
      removeElement,
      addHighlight,
      removeHighlight,
      swapValues,
    },
  };
};

const simpleArrayIteration = async ({
  array,
  addHighlight,
  removeHighlight,
  reverse = false,
  color = "green",
}) => {
  if (reverse) {
    for (let i = array.length - 1; i >= 0; i--) {
      addHighlight(i, color);
      await wait(1000);
      removeHighlight(i);
    }
  } else {
    for (let i = 0; i < array.length; i++) {
      addHighlight(i, color);
      await wait(1000);
      removeHighlight(i);
    }
  }
};

const swapValues = async (event, methods) => {
  event.preventDefault();
  methods.addHighlight(0, "blue");
  methods.addHighlight(1, "red");
  await wait(1000);
  methods.swapValues(0, 1);
  methods.addHighlight(0, "red");
  methods.addHighlight(1, "blue");
  await wait(1000);
  methods.removeHighlight(0);
  methods.removeHighlight(1);
};

const ArrayIteration = ({ reverse, color }) => {
  const { array, highlights, methods } = useHightlightArray({
    initialArray: [1, 2, 3, 4, 5],
  });

  return (
    <div>
      <button
        onClick={() =>
          simpleArrayIteration({
            array,
            addHighlight: methods.addHighlight,
            removeHighlight: methods.removeHighlight,
            reverse: reverse,
            color: color,
          })
        }
      >
        Run
      </button>
      <button onClick={(event) => swapValues(event, methods)}>Swap 0-1</button>
      <IterableArray elements={array} highlights={highlights} />
    </div>
  );
};

export default ArrayIteration;
