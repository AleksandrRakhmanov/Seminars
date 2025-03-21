import React from 'react';
import styles from './About.module.css'; // Импортируем стили
import logo_img from './logo_img.png';

const About = () => {
  return (
    <div className={styles.aboutPage}>
      <header className={styles.aboutHeader}>
        <h1>О нас</h1>
      </header>
      <main className={styles.aboutContent}>
        <div className={styles.aboutContainer}>
          <div className={styles.aboutImage}>
            <img src={logo_img} alt="Наша команда" />
          </div>
          <div className={styles.aboutText}>
            <section className={styles.aboutSection}>
              <h2>Наша миссия</h2>
              <p>
                Мы стремимся предоставлять качественные и актуальные знания
                через наши семинары, помогая профессионалам расти и развиваться
                в своих областях.
              </p>
            </section>
            <section className={styles.aboutSection}>
              <h2>Наша команда</h2>
              <p>
                Наша команда состоит из опытных специалистов, которые увлечены
                своим делом и готовы делиться своими знаниями с вами.
              </p>
            </section>
            <section className={styles.aboutSection}>
              <h2>Наши семинары</h2>
              <p>
                Мы проводим семинары по различным темам, которые помогут вам
                расширить свои знания и навыки. Присоединяйтесь к нам и станьте
                частью нашего сообщества!
              </p>
            </section>
          </div>
        </div>
      </main>
      <footer className={styles.aboutFooter}>
        <p>© 2023 Семинары. Все права защищены.</p>
      </footer>
    </div>
  );
};

export default About;
