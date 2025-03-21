import React from 'react';
import './DeleteModal.css';

const DeleteModal = ({ confirm, cancel }) => {
  return (
    <div className="modal_window">
      <div className="modal">
        <h2>Подтверждение удаления</h2>
        <p>Вы уверены, что хотите удалить этот семинар?</p>
        <div className="modal_btn">
          <button className="confirm_btn" onClick={confirm}>
            Удалить
          </button>
          <button className="cancel_btn" onClick={cancel}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
