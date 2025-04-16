import React, { useState,useEffect, Suspense } from 'react';
import styles from './YourSeminars.module.css';
import Modal from './Modal/Modal'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const YourSeminars =  () => {
  const [seminars, setSeminars] = useState([]);


  const onEdit = () => {
    console.log('Изменение семинара');
  }

  const onDelete = () => {
    console.log('Удаление семинара');
  }

  useEffect(()  =>  {
    const fetchSeminar = async () => {
      try {
        const response = await axios.get('http://localhost:5005/getYourSeminars')
        // console.log(response.data);
        setSeminars(response.data)

      
          }catch(err) {
            console.error(err);
        }
    }
    fetchSeminar()
  }, [])

  console.log(seminars);

  return (
    <div className={styles.main_container}>
  <div className={styles.seminars_contanter}>
    {seminars.length ? (
      seminars.map((seminar) => (
        <Suspense key={`suspense-${seminar.id}`}>
        <div className={styles.seminar_card} key={seminar.id}>
          <Link to={`/seminars/${seminar.id}`} className={styles.description_card}>
            <div>
              <h2 className={styles.seminar_title}>{seminar.title}</h2>
              <p className={styles.seminar_description}>{seminar.description}</p>
              <p className={styles.seminar_dateAndTime}>
                {seminar.date} в {seminar.time}
              </p>
              <img
                className={styles.photo_card}
                src={seminar.photo}
                alt={seminar.title}
              />
            </div>
          </Link>
          <div className={styles.icons}>
            <button
              className={styles.edit_btn}
              onClick={(e) => {
                e.stopPropagation();
                onEdit(seminar);
              }}
            ></button>
            <button
              className={styles.delete_btn}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(seminar.id);
              }}
            ></button>
          </div>
        </div>
        </Suspense>
      ))
    )
        : (
          <Modal/>
        )}
      </div>
    </div>
  );
};

export default YourSeminars;

