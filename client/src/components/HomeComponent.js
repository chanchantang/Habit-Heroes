// src/components/HomeComponent.js
import React, { useState, useEffect, Fragment } from "react";
import CharacterSprite from "./CharacterSprite";
import Input from "./Input";

import LevelBars from "./LevelBars";
import List from "./List";

const HomeComponent = () => {
  const [str, setStr] = useState(534);
  const [int, setInt] = useState(241);
  const [char, setChar] = useState(343);

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="d-flex justify-content-end align-items-center">
        <CharacterSprite />
      </div>
      <div
        className="d-flex justify-content-center align-items-center"
      >
        <div className="container">
          <LevelBars str={str} int={int} char={char} />
          <Input />
          <List
            str={str}
            int={int}
            char={char}
            setStr={setStr}
            setInt={setInt}
            setChar={setChar}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
