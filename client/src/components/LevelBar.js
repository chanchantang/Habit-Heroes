import React, { Fragment, useState } from "react";

const LevelBar = ({ name, exp, color }) => {
  const [level] = useState(0);
  let style_color = "";
  switch (color) {
    case "green":
      style_color = "bg-success";
      break;
    case "red":
      style_color = "bg-danger";
      break;
    case "yellow":
      style_color = "bg-warning";
      break;
    default:
      style_color = "bg-info";
  }

  return (
    <Fragment>
      <h1>
        {name}: lvl {Math.floor(exp / 100)}
      </h1>
      <div class="progress">
        <div
          class={`progress-bar ${style_color}`}
          role="progressbar"
          style={{ width: exp / 10 + "%" }}
          aria-valuenow={exp / 10}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </Fragment>
  );
};

export default LevelBar;
