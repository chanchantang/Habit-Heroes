import React, { Fragment } from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import Tabs from "./components/Tabs";
// import Input from "./components/Input";
// import List from "./components/List";
// import CharacterSprite from "./components/CharacterSprite";
// import UserProfilePage from "./components/UserProfilePage";


function App() {
  return (
    <Fragment>
      <div className="horizontal-scroll">
        <Tabs/>
      </div>
    </Fragment>
  );
}

export default App;