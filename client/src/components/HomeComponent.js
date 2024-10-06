// src/components/HomeComponent.js
import React, { useState, useEffect, Fragment } from "react";
import CharacterSprite from "./CharacterSprite";
import Input from "./Input";
import LevelBar from "./LevelBar";
import List from "./List";

const HomeComponent = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      console.log("@@ fetching: ", `${process.env.REACT_APP_API_URL}/users/1`);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/1`);
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
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
};

export default HomeComponent;
