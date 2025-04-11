import React, { useEffect, useState } from 'react';
import axios from 'axios'
import styles from './SeminarCard.module.css';
import { Link } from 'react-router-dom';
const SeminarCard = ({ seminar, onEdit, onDelete, onSignUp }) => {


const [seminars, setSeminars] = useState([]);

useEffect(() => {
  axios.get('http://localhost:5005/seminars')
    .then(response => {
      setSeminars(response.data);
    })
    .catch(error => console.error('Ошибка при загрузке семинаров', error));
}, []);


  return (
    <div className={styles.seminar_card}>
    <Link to={`/seminars/${seminar.id}`}  key={seminar.id}>
      <div className={styles.description_card}></div>
      <div>
        <div className={styles.icons}>
        </div>
        <h2 className={styles.seminar_title}>{seminar.title}</h2>
        <p className={styles.seminar_description}>{seminar.description}</p>
        <p className={styles.seminar_dateAndTime}>
          {seminar.date} {seminar.time}
        </p>
        <div class="photo_container">
        <img
          className={styles.photo_card}
          src={seminar.photo}
          alt={seminar.title}
        />
        </div>
      </div>

    </Link>
    <button className={styles.join_btn} onClick={onSignUp}>
        Записаться
      </button>
    </div>
  );
};

export default SeminarCard;
