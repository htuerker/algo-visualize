const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const simpleArrayIteration = async ({
  array,
  methods,
  reverse = false,
  color = "green",
}) => {
  const { addHighlight, removeHighlight } = methods;
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
  const { addHighlight, removeHighlight } = methods;
  event.preventDefault();
  addHighlight(0, "blue");
  addHighlight(1, "red");
  await wait(1000);
  swapValues(0, 1);
  addHighlight(0, "red");
  addHighlight(1, "blue");
  await wait(1000);
  removeHighlight(0);
  removeHighlight(1);
};

export { wait, simpleArrayIteration, swapValues };
