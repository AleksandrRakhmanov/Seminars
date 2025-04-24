import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Home.module.scss';
import Carousel from './MyCarousel';

const Home = () => {
  const navigate = useNavigate();

  const slides = [
    {
      id: 4,
      image: 'https://yastatic.net/naydex/shedevrum/zog8b8l05/65a539Wgm7gY/Hth7DgbF1Qea9QxYPp3fASxbXDtGIf77VuQti5-mbxyCFfOtpTU72PSPVYYijNt3W1xlfwnxvahTG3MFFPqsjB5pmu5HxeFCnpF47c7p68UpXukeciHu6icwrgg88KwP8LaRbraGijyBykDyJtj-tp-8ZlyA',
      title: 'Натуральная косметика своими руками: мастер-класс',
      description: 'Lorem ipsum, dolor sit'
    },
    {
      id: 6,
      image: 'https://avatars.mds.yandex.net/get-shedevrum/15288264/img_0596ff35e93211ef9ac802bc707acb85/orig',
      title: 'Мужская косметика: особенности ухода за кожей',
      description: 'Ullam sequi quos a dicta saepe odio'
    },
    {
      id: 3,
      image: 'https://avatars.mds.yandex.net/get-shedevrum/15288264/img_faf4a76fe93011ef885f6e1ef45c01ed/orig',
      title: 'Ароматерапия в косметологии: как запахи влияют на кожу',
      description: 'Quod, quidem nesciunt voluptas quo alias sunt asperiores'
    }
  ];

  const handleSlideClick = (id) => {
    navigate(`/seminars/${id}`);
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.seminars_container}>
        <h1 className={styles.title}>Образовательная платформа</h1>        
        <Carousel 
          slides={slides}
          interval={5000}
          onSlideClick={handleSlideClick}
        />

        <div className={styles.buttons_container}>
          <Link to="/seminars">
            <button>Семинары</button>
          </Link>
          <Link to="/About">
            <button>О нас</button>
          </Link>
        </div>  
      </div>
    </div>
  );
};

export default Home;
