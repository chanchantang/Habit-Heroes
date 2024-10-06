// src/components/Leaderboard.js

import React, { Fragment, useEffect, useState } from "react";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);

  const getUsers = async () => {
    try {
      console.log("@@ fetching: ", `${process.env.REACT_APP_API_URL}/users`);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users`);
      const jsonData = await response.json();

      setUsers(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Fragment>
      <h1 className="text-center mt-5" style={{ textAlign: "center" }}>
        Leaderboard
      </h1>
      <table className="table mt-5 text-center">
        <tbody>
          {users.map((user) => (
            <tr>
              <td>
                {user.user_id} {user.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Leaderboard;
