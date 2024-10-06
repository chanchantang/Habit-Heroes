import React, { Fragment, useEffect, useState } from "react";

import Edit from "./Edit";

const List = () => {
  const [todos, setTodos] = useState([]);

  const handleCheckboxChange = async (todo_id) => {
    const updatedTodos = todos.map((todo) =>
      todo.todo_id === todo_id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

    const updatedTodo = updatedTodos.find((todo) => todo.todo_id === todo_id);

    // Send the updated 'completed' status to the server
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/todos/${todo_id}`, {
        method: "PUT", // Or PATCH depending on your API setup
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: updatedTodo.completed,
          date: updatedTodo.date,
          description: updatedTodo.description,
          type: updatedTodo.type,
          difficulty: updatedTodo.difficulty,
          experience: updatedTodo.experience,
        }),
      });
    } catch (error) {
      console.error("Error updating todo:", error.message);
    }
  };

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
              {/* Ensure the checkbox is placed inside a <td> */}
              <td>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleCheckboxChange(todo.todo_id)}
                />
              </td>
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
