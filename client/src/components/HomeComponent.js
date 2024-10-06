// src/components/HomeComponent.js
import React, { useState, useEffect, Fragment } from "react";
import CharacterSprite from "./CharacterSprite";
import Input from "./Input";

import LevelBars from "./LevelBars";
import List from "./List";

const HomeComponent = () => {
  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="d-flex justify-content-end align-items-center">
        <CharacterSprite />
      </div>
      <div
        className="d-flex justify-content-center align-items-center"
      >
        <div className="container">
          <CharacterSprite />
          <LevelBars />
          <Input />
          <List />
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
