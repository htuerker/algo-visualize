import React from "react";
import IterableArray from "../components/IterableArray";
import useHightlightArray from "../state/hooks/useHighlightArray";
import { simpleArrayIteration, swapValues } from "../utils";

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
            methods,
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
