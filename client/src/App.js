import React, { Fragment } from "react";
import "./App.css";
import Input from "./components/Input";
import List from "./components/List";
import Level from "./components/Level";

function App() {
  return (
    <Fragment>
      <div className="container">
        <Input />
        <List />
      </div>
      <div className="container">
        <Level name="str" exp={10} color="red" />
        <Level name="int" exp={20} color="green" />
        <Level name="char" exp={30} color="" />
      </div>
    </Fragment>
  );
}

export default App;
