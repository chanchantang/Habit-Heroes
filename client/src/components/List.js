import React, { Fragment, useEffect, useState } from "react";

import Edit from "./Edit";

const List = () => {
  const [todos, setTodos] = useState([]);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  //delete todo function

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(
        `${process.env.REACT_APP_API_URL}/todos/${id}`,
        {
          method: "DELETE",
        }
      );

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  const getTodos = async () => {
    try {
      console.log("@@ fetching: ", `${process.env.REACT_APP_API_URL}/todos`);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/todos`);
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  console.log(todos);

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Completed</th>
            <th>Description</th>
            <th>Experience</th>
            <th>Type</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <td>{todo.description}</td>
              <td>{todo.experience}</td>
              <td>{todo.type}</td>
              <td>
                <Edit todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default List;
