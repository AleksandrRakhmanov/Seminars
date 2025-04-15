import { useState, useEffect } from 'react';
import styles from './Carousel.module.css';


const Carousel = ({ slides, interval = 3000, onSlideClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);
    
    return () => clearInterval(timer);
  }, [slides.length, interval]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.carousel}>
      <button onClick={goToPrev} className={styles.prevButton}>
        &lt;
      </button>
      
      <div className={styles.slideContainer}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={styles.slide}
            onClick={() => onSlideClick(slide.id)}
            style={{
              display: index === currentIndex ? 'flex' : 'none',
            }}
          >
            <img 
              src={slide.image} 
              alt={slide.title}
              className={styles.slideImage}
            />
            <div className={styles.caption}>
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button onClick={goToNext} className={styles.nextButton}>
        &gt;
      </button>
    </div>
  );
};

export default Carousel;