import React, { Fragment, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownInput from "./Dropdown.js";


const Edit = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);
  const [type, setType] = useState(todo.type);
  const [experience, setExperience] = useState(todo.experience);
  const [show, setShow] = useState(false);
  const [difficulty, setDifficulty] = useState(todo.difficulty);


  const handleClose = () => {
    setDescription(todo.description);
    setType(todo.type);
    setExperience(todo.experience);
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const updateTodo = async (event) => {
    event.preventDefault();
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          completed: todo.completed,
          date: todo.date,
          description: description,
          type: type,
          difficulty: todo.difficulty,
          experience: experience,
        }),
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };



  return (
    <Fragment>
      <Button variant="secondary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
              <Form.Label>Experience</Form.Label>
              <Form.Control
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </Form.Group>
          </Form>
          <DropdownInput options={["Easy", "Medium", "Hard"]} setState={setDifficulty} label="Difficulty" />
          <DropdownInput 
            options={["Strength", "Intelligence", "Charisma"]} 
            setState={setType} 
            label="Type" 
            onChange={(e) => setType(e.target.value)}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="warning"
            onClick={(e) => {
              updateTodo(e);
              handleClose();
            }}
          >
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Edit;
