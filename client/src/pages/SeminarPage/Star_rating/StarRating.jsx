import React, { useState } from 'react';
import './StarRating.css';

const StarRating = ({ initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    if (onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseOver = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="star-rating-container">
      <div className="rating-container">
        {[1, 2, 3, 4, 5].map((value) => (
          <div
            key={value}
            className={`star ${value <= (hoverRating || rating) ? 'active' : ''}`}
            onClick={() => handleClick(value)}
            onMouseOver={() => handleMouseOver(value)}
            onMouseLeave={handleMouseLeave}
          >
            ★
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarRating;