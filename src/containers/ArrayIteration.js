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

  const addHighlight = useCallback(
    (index, color = "green") => {
      const newHash = { ...highlights};
      newHash[`${index}`] = color;
      setHighligts(newHash);
    },
    [highlights]
  );

  const removeHighlight = useCallback(
    (index) => {
      const newHash = {...highlights}
      newHash[`${index}`] = null;
      setHighligts(newHash);
    },
    [highlights]
  );

  return {
    array,
    highlights,
    methods: {
      addElement,
      removeElement,
      addHighlight,
      removeHighlight,
    },
  };
};

const simpleArrayIteration = async ({
  array,
  addHighlight,
  removeHighlight,
}) => {
  for (let i = 0; i < array.length; i++) {
    addHighlight(i);
    await wait(1000);
    removeHighlight(i);
  }
};

const ArrayIteration = () => {
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
          })
        }
      >
        Run
      </button>
      <IterableArray elements={array} highlights={highlights} />
    </div>
  );
};

export default ArrayIteration;
