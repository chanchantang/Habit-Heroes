import React, { Fragment } from "react";
import "./App.css";
import Tabs from "./components/Tabs";
import backgroundImage from './components/background.jpeg'
// import Input from "./components/Input";
// import List from "./components/List";
// import CharacterSprite from "./components/CharacterSprite";
// import UserProfilePage from "./components/UserProfilePage";

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%'
      }}
    >
      <div className="container-fluid">
        <Tabs />
      </div>
    </div>
  );
}

export default App;
