import React from 'react';
import styles from './YourSeminars.module.css';
import Modal from './Modal/Modal'
const YourSeminars = () => {
  const seminars = [];
  return (
    <div className={styles.main_container}>
      <div className={styles.seminars_contanter}>
        {seminars.length ? (
          <div>
            {seminars.map((seminar) => (
              <div>{seminar}</div>
            ))}
          </div>
        ) : (
          <Modal/>
        )}
      </div>
    </div>
  );
};

export default YourSeminars;
