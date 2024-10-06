// src/components/HomeComponent.js
import React, { useState, Fragment } from "react";
import CharacterSprite from "./CharacterSprite";
import Input from "./Input";
import LevelBar from "./LevelBar";
import List from "./List";

const HomeComponent = () => (
  <div className="container-fluid" style={{ height: "100vh" }}>
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100%" }}
    >
      <div className="container">
        <CharacterSprite />
        <LevelBar name="Strength" exp="50" color="red" />
        <LevelBar name="Intelligence" exp="30" color="green" />
        <LevelBar name="Charisma" exp="70" color="" />
        <Input />
        <List />
      </div>
    </div>
  </div>
);

export default HomeComponent;
