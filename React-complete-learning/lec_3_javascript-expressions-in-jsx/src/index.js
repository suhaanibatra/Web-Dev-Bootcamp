// js inside html inside js file
import React from "react";
import ReactDOM from "react-dom";

const fname = "Suhaani";
const lname = "Batra";
const num = 5;

//can only add a JS expression not a statement!
ReactDOM.render(
  <div>
    <h1>
      {/* Hello {fname} {lname}! */}
      Hello {`${fname} ${lname}`}
    </h1>
    <p>My lucky number is {num} </p>
    <h4>Here is a random number for you {Math.floor(Math.random() * 10)} </h4>
  </div>,
  document.getElementById("root")
);
