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
  increaseStep,
  increaseSwap,
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

const mergeSort = async ({
  array,
  methods,
  start = 0,
  end = array.length - 1,
  options,
}) => {
  const {
    speed,
    compareFunction,
    tempElement,
    setTempElement,
    setDisplayText,
    increaseStep,
  } = options;

  const { addHighlight, removeHighlight } = methods;
  let mid;

  // clear current set
  let index = start;
  while (index <= end) {
    removeHighlight(index);
    index++;
  }
  setDisplayText(
    `mergeSort: (array: [${array.slice(
      start,
      end + 1
    )}], start: ${start}, end:${end}})`
  );
  increaseStep();
  console.log("increase");
  await wait(speed);

  if (start === end) {
    addHighlight(start, "red");
    setDisplayText(`Base case: Array: [${array.slice(start, end + 1)}]`);
    await wait(speed);
    removeHighlight(start);
    return;
  }

  if (start < end) {
    mid = Math.floor((start + end) / 2);
    let index = mid + 1;
    while (index <= end) {
      addHighlight(index, "white");
      index++;
    }
    await wait(speed);
    await mergeSort({
      array,
      methods,
      options,
      start: start,
      end: mid,
    });

    await mergeSort({
      array,
      methods,
      start: mid + 1,
      end: end,
      options,
    });
    await merge({
      array,
      methods,
      start,
      mid,
      end,
      options,
    });
  }
};

const merge = async ({ array, start, mid, end, methods, options }) => {
  console.log(options);
  const { speed, setDisplayText, setTempElement, increaseStep, increaseSwap } =
    options;
  const { addHighlight, removeHighlight } = methods;

  let p1 = start;
  let p2 = mid + 1;

  let i = start;
  while (i <= end) {
    addHighlight(i, "blue");
    i++;
  }
  setDisplayText(
    `merge: (array: [${array.slice(
      start,
      end + 1
    )}], start: ${start}, end:${end}}), mid:${mid}`
  );
  await wait(speed);
  while (p1 <= mid && p2 <= end) {
    increaseStep();
    setDisplayText(`Compare: array[${p1}] <= array[${p2}]`);
    addHighlight(p1, "orange");
    addHighlight(p2, "orange");
    await wait(speed);
    if (array[p1] <= array[p2]) {
      setDisplayText(`${array[p1]} <= ${array[p2]}`);
      addHighlight(p1, "green");
      addHighlight(p2, "green");
      await wait(speed);
      p1++;
    } else {
      addHighlight(p1, "red");
      addHighlight(p2, "red");
      setDisplayText(`${array[p1]} > ${array[p2]}`);
      await wait(speed);
      let temp = array[p2];
      setTempElement(array[p2]);
      let idx = p2;
      while (idx > p1) {
        array[idx] = array[idx - 1];
        methods.setElement(idx, array[idx - 1]);
        increaseSwap();
        setDisplayText(`Shifting array:[${idx - 1}] to array:[${idx}]`);
        await wait(speed);
        idx--;
      }
      array[p1] = temp;
      addHighlight(p1, "green");
      methods.setElement(p1, temp);
      await wait(speed);
      increaseSwap();

      p1++;
      mid++;
      p2++;
    }
  }
  let j = start;
  while (j <= end) {
    addHighlight(j, "green");
    j++;
  }
};

export { wait, simpleArrayIteration, swapValues, bubbleSort, mergeSort };
