import React from "react";
import "../styleSheets/Checkbox.css";

const Checkbox = ({ checked, id }) => {
  return (
    <label className="checkbox-label">
      <input type="checkbox" onChange={() => checked(id)} />
      <span className="checkbox-custom"></span>
    </label>
  );
};

export default Checkbox;