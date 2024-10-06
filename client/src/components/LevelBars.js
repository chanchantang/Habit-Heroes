import React, { useState, useEffect, Fragment } from "react";
import LevelBar from "./LevelBar";

const LevelBars = ({ str, int, char }) => {
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

  console.log(user);

  return (
    <Fragment>
      <LevelBar name="Strength" exp={str} color="red" />
      <LevelBar name="Intelligence" exp={int} color="green" />
      <LevelBar name="Charisma" exp={char} color="" />
    </Fragment>
  );
};

export default LevelBars;
