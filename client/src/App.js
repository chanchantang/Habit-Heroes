import React, { Fragment } from "react";
import "./App.css";
import Tabs from "./components/Tabs";
// import Input from "./components/Input";
// import List from "./components/List";
// import CharacterSprite from "./components/CharacterSprite";
// import UserProfilePage from "./components/UserProfilePage";

function App() {
  return (
    <div>
      <div className="container-fluid">
        <Tabs />
      </div>
      {/* <div className="container">
        <Level name="str" exp={10} color="red" />
        <Level name="int" exp={20} color="green" />
        <Level name="char" exp={30} color="" />
      </div> */}
    </div>
  );
}

export default App;
