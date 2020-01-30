import React from "react";
import "../styleSheets/Checkbox.css";

const Checkbox = ({ markComplete, id }) => {
  return (
    <label className="checkbox-label">
      <input type="checkbox" onChange={() => markComplete(id)} />
      <span className="checkbox-custom"></span>
    </label>
  );
};

export default Checkbox;