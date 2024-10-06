import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

function DropdownMenu({ options, setState, label }) {
  const [selectedValue, setSelectedValue] = useState("Select an option");

  const handleSelect = (eventKey) => {
    setSelectedValue(eventKey);
  };

  return (
    <div className="container mt-5">
      <div>{label}</div>
      <Dropdown
        onSelect={handleSelect}
        onChange={(event) => setState(event.target.value)}
      >
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          {selectedValue}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey={options[0]}>{options[0]}</Dropdown.Item>
          <Dropdown.Item eventKey={options[1]}>{options[1]}</Dropdown.Item>
          <Dropdown.Item eventKey={options[2]}>{options[2]}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default DropdownMenu;
