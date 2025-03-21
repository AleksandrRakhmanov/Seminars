import React from 'react';
import styles from './Home.module.css';
import photo from './photo.webp';

const Home = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.seminars_contanter}>
        <img className={styles.photo} src={photo} />
        <h1>Образовательная платформа с семинарами</h1>
        <div className={styles.container_btns}>
          <button>
            <p>Семинары</p>
          </button>
          <button>
            <p>О нас</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
