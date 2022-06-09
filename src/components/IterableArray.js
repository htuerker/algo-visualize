import "./IterableArray.css";

import React from "react";

const IterableArray = ({ elements, highlights }) => {
  return (
    <div className="array-container">
      {elements.map((element, idx) => (
        <div
          key={idx}
          className="array-element"
          style={{ backgroundColor: highlights[idx] }}
        >
          {element}
          <div className="caption">{idx}</div>
        </div>
      ))}
    </div>
  );
};

export default IterableArray;
