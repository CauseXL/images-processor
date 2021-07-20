// eslint-disable-next-line import/no-extraneous-dependencies
import * as React from "react";
import "react-app-polyfill/ie11";
// eslint-disable-next-line import/no-extraneous-dependencies
import * as ReactDOM from "react-dom";
import Editor from "../.";

const App = () => {
  return (
    <div>
      <Editor />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
