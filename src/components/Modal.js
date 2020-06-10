import React from "react";

import ReactDOM from "react-dom";
import "./style/modal.css";

function Modal(props) {
    if (!props.isOpen) {
        return null;
    }
  return ReactDOM.createPortal(
    <div className="Modal">
      <div className="Modal_container">
        <button onClick={props.onClose} className="Modal_close-button">X</button>
        {props.children}
      </div>
    </div>,
    document.getElementById("modal")
  );
}
export default Modal;
