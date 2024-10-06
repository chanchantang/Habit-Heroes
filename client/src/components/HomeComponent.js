// src/components/HomeComponent.js
import React, { useState, useEffect, Fragment } from "react";
import CharacterSprite from "./CharacterSprite";
import Input from "./Input";
import LevelBar from "./LevelBar";
import List from "./List";

const HomeComponent = () => {
  const [user, setUser] = useState([]);

  const getUser = async () => {
    try {
      console.log("@@ fetching: ", `${process.env.REACT_APP_API_URL}/user/1`);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/1`);
      const jsonData = await response.json();

      setUser(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log("user");
  console.log(user);

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <div className="container">
          <CharacterSprite />
          <LevelBar name="Strength" exp={user.strength_exp} color="red" />
          <LevelBar
            name="Intelligence"
            exp={user.intelligence_exp}
            color="green"
          />
          <LevelBar name="Charisma" exp={user.charisma_exp} color="" />
          <Input />
          <List />
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
