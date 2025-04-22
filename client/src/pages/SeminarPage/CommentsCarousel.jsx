import React, { useState } from 'react';
import rate_icon from './icons/rate_icon.png';  
import styles from './Carousel.module.css';

const CommentsCarousel = ({ comments }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const groupSize = 3;
  const commentGroups = [];
  for (let i = 0; i < comments.length; i += groupSize) {
    commentGroups.push(comments.slice(i, i + groupSize));
  }

  const nextGroup = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === commentGroups.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevGroup = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? commentGroups.length - 1 : prevIndex - 1
    );
  };

  if (comments.length === 0) {
    return <div className={styles.noComments}>Нет комментариев</div>;
  }

  return (
    <div className={styles.carouselContainer}>
      <button onClick={prevGroup} className={styles.carouselButton}>
        &lt;
      </button>
      
      <div className={styles.carouselContent}>
        {commentGroups[currentIndex]?.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            <div className={styles.user_info}>
              <img src={comment.url_photo || user_image} className={styles.user_image} alt="user" />
              <div className={styles.comment_username}>
                {comment.username}
              </div>
              <div>
                {Array.from({ length: comment.rating }).map((_, index) => (
                  <img
                    key={index}
                    className={styles.comment_rate_icon}
                    src={rate_icon}
                    alt="rate_icon"
                  />
                ))}
              </div>
            </div>
            <div>
              <p className={styles.comment_text}>{comment.comment_text}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button onClick={nextGroup} className={styles.carouselButton}>
        &gt;
      </button>
    </div>
  );
};

export default CommentsCarousel;