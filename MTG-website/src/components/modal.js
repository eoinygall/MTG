import React from 'react';
import '../pages/styles.css';

function Modal({ show, onClose, onConfirm, title, message }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message}</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="modal-confirm-button">Yes, Delete</button>
          <button onClick={onClose} className="modal-cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
