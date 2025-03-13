import React from "react";
import "../styles/FormModal.scss";

export default function FormModal({ isOpen, message, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <p>{message}</p>
        <button className="modal__closeBtn" onClick={onClose}>
          <span>확인</span>
        </button>
      </div>
    </div>
  );
}
