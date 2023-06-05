//require react and reactdom
// var React = require("react");
// var ReactDOM = require("react-dom");

import React from "react";
import ReactDOM from "react-dom";

//to render
//ReactDOM.render(WHAT TO SHOW, WHERE TO SHOW);
// ReactDOM.render(<h1>Hello World </h1>, document.getElementById("root"));
ReactDOM.render(
  <div>
    <h1>Hello World! </h1>
    <p>This is React JSX </p>
  </div>,
  document.getElementById("root")
);

// react works by creating jsx files
// by including the react module we get access to a compiler
//that does all the heavy lifting in the conversion

//Babel is a JS compiler - compiles JSX to plain old JavaScript -
//that can be read by any broswer

//render can only render a single HTML element at a time - use div
