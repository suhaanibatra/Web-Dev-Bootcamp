import React from "react";
import ReactDOM from "react-dom";

const customStyle = {
  color: "blue",
  fontSize: "3.5rem",
  border: "1rem solid black"
};

ReactDOM.render(
  <div>
    <h1 style={customStyle}>Hello World!</h1>
  </div>,
  document.getElementById("root")
);
