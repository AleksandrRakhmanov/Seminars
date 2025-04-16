import React from 'react';
import styles from './SeminarCard.module.css';
import { Link } from 'react-router-dom';

const SeminarCard = ({ seminar, onEdit, onDelete, onSignUp }) => {
  return (
    <div className={styles.seminar_card}>
      <Link to={`/seminars/${seminar.id}`} key={seminar.id}>
        <div className={styles.description_card}></div>
        <div>
          <div className={styles.icons}></div>
          <h2 className={styles.seminar_title}>{seminar.title}</h2>
          <p className={styles.seminar_description}>{seminar.description}</p>
          <p className={styles.seminar_dateAndTime}>
            {seminar.date} {seminar.time}
          </p>
          <div className={styles.photo_container}>
            <img
              className={styles.photo_card}
              src={seminar.photo}
              alt={seminar.title}
            />
            <div className={styles.icons}>
              <button
                className={styles.edit_btn}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onEdit(seminar);
                }}
              ></button>
              <button
                className={styles.delete_btn}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onDelete(seminar.id);
                }}
              ></button>
            </div>
          </div>
        </div>
      </Link>
      <Link to={`/seminars/${seminar.id}`} className={styles.join_btn} onClick={onSignUp}>
        Записаться
      </Link>
    </div>
  );
};

export default SeminarCard;