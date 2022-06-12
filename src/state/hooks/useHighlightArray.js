import { useCallback, useState } from "react";

// highlights: [{ index: Number, color: String }]
const useHighlightArray = ({ initialArray = [], initialHighlights = {} }) => {
  const [array, setArray] = useState(initialArray);
  const [highlights, setHighligts] = useState(initialHighlights);

  const setElement = useCallback((index, value) => {
    setArray((prevState) => {
      const newArray = [...prevState];
      newArray[index] = value;
      return newArray;
    });
  }, []);

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

  const clearHighlights = useCallback(() => {
    setHighligts({});
  });

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
      setElement,
      addElement,
      removeElement,
      addHighlight,
      removeHighlight,
      clearHighlights,
      swapValues,
    },
  };
};

export default useHighlightArray;
