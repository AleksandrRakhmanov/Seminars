import React from 'react';
import './EditModal.scss';
const EditModal = ({ seminar, change, save, cancel }) => {
  return (
    <div className="modal_window">
      <div className="modal">
        <h2>Редактирование семинара</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            save();
          }}
        >
          <label>
            Название:
            <input
              type="text"
              name="title"
              value={seminar.title}
              onChange={change}
            />
          </label>
          <label>
            Описание:
            <textarea
              name="description"
              value={seminar.description}
              onChange={change}
            />
          </label>
          <label>
            Дата:
            <input
              type="date"
              name="date"
              value={seminar.date}
              onChange={change}
            />
          </label>
          <label>
            Время:
            <input
              type="time"
              name="time"
              value={seminar.time}
              onChange={change}
            />
          </label>
          <label>
            Фото (URL):
            <input
              type="text"
              name="photo"
              value={seminar.photo}
              onChange={change}
            />
          </label>
          <div className="modal_btn">
            <button type="submit" className="confirm_btn">
              Сохранить
            </button>
            <button type="button" className="cancel_btn" onClick={cancel}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
