import React from "react";
import ReactDOM from "react-dom";

//className instead of class - these are different from HTML - check before applying

const img = "https://picsum.photos/200";

ReactDOM.render(
  <div>
    <h1 className="heading" contentEditable="false" spellCheck="false">
      My Favourite Foods
    </h1>
    <div>
      <img src={img + "?grayscale"} alt="random" />
    </div>
  </div>,
  document.getElementById("root")
);
