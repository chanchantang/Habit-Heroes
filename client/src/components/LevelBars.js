import React, { useState, useEffect, Fragment } from "react";
import LevelBar from "./LevelBar";

const LevelBars = () => {
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
      <LevelBar name="Strength" exp={user[0].strength_exp} color="red" />
      <LevelBar
        name="Intelligence"
        exp={user[0].intelligence_exp}
        color="green"
      />
      <LevelBar name="Charisma" exp={user[0].charisma_exp} color="" />
    </Fragment>
  );
};

export default LevelBars;
