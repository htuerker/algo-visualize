import "./IterableArray.css";

import React from "react";

const IterableArray = ({ elements, highlight }) => {
  return (
    <div className="array-container">
      {elements.map((element, idx) => (
        <div
          key={element.element}
          className={`array-element ${highlight === idx ? "highlighted" : ""}`}
        >
          {element}
          <div className="caption">{idx}</div>
        </div>
      ))}
    </div>
  );
};

export default IterableArray;
