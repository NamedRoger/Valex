import * as React from "react";
import ReactDOM from "react-dom";

export default function ModalOverlay() {
    return ReactDOM.createPortal(
        <div className="modal-backdrop fade show"></div>,
        document.body
    );
}