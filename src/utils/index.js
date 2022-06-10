const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const simpleArrayIteration = async ({
  array,
  methods,
  reverse = false,
  color = "green",
  speed = 1000,
}) => {
  const { addHighlight, removeHighlight } = methods;
  if (reverse) {
    for (let i = array.length - 1; i >= 0; i--) {
      addHighlight(i, color);
      await wait(speed);
      removeHighlight(i);
    }
  } else {
    for (let i = 0; i < array.length; i++) {
      addHighlight(i, color);
      await wait(speed);
      removeHighlight(i);
    }
  }
};

const swapValues = async ({ index1, index2, methods, color1, color2 }) => {
  const { addHighlight, removeHighlight } = methods;
  addHighlight(index1, "blue");
  addHighlight(index2, "red");
  await wait(1000);
  methods.swapValues(index1, index2);
  addHighlight(index1, "red");
  addHighlight(index2, "blue");
  await wait(1000);
  removeHighlight(index1);
  removeHighlight(index2);
};

const localSwap = (array, idx1, idx2) => {
  let temp = array[idx1];
  array[idx1] = array[idx2];
  array[idx2] = temp;
};

const bubbleSort = async ({
  array,
  methods,
  speed = 1000,
  compareFunction = (a, b) => a > b,
}) => {
  const localArray = [...array];
  const { addHighlight, removeHighlight } = methods;
  for (let i = 0; i < localArray.length - 1; i++) {
    for (let j = 0; j < localArray.length - i - 1; j++) {
      addHighlight(j, "green");
      addHighlight(j + 1, "orange");
      await wait(speed / 3);
      if (compareFunction(localArray[j], localArray[j + 1])) {
        addHighlight(j + 1, "blue");
        await wait(speed / 3);
        methods.swapValues(j, j + 1);
        localSwap(localArray, j, j + 1);
      }
      await wait(speed / 3);
      removeHighlight(j);
      removeHighlight(j + 1);
    }
  }
};

export { wait, simpleArrayIteration, swapValues, bubbleSort };
