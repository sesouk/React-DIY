import React from "react";
import ReactDOM from "react-dom";

const element = (
  <div id="foo">
    <a href="/">bar</a>
    <b />
  </div>
);

const container = document.getElementById("root");
ReactDOM.render(element, container);
