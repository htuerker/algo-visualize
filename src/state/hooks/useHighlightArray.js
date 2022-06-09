import { useCallback, useState } from "react";

// highlights: [{ index: Number, color: String }]
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

export default useHightlightArray;