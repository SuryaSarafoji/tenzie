import React from "react";

function Button(props) {
  return (
    <button
      className={props.initBool ? "button click" : "button"}
      onClick={props.boolen ? props.held : () => {}}
    >
      {props.rand}
    </button>
  );
}

export default Button;
