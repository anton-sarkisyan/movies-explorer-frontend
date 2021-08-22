import React, { useState } from 'react';
import './moviesCard.css';

const MoviesCard = ({
  src, title, time, isSaved,
}) => {
  const [isLike, setIsLike] = useState(false);

  const handleLikeClick = () => {
    setIsLike((prevState) => !prevState);
  };

  return (
    <li className='card'>
      <img
        alt={title}
        src={src}
        className='card__img'/>
      <div className={
        `card__items-block
        ${isSaved && 'card__items-block_saved'}`
      }>
        <div className='card__items'>
          <p className='card__title'>
            {title}
          </p>
          {isSaved
            ? (
              <button
                type='button'
                className='
                card__button
                card__button_type_close'
              />
            )
            : (
              <button
                type='button'
                className={
                  `card__button
                  card__button_type_like
                  ${isLike && 'card__button_type_like-on'}`
                }
                onClick={handleLikeClick}
              />
            )
          }
        </div>
        <p className='card__duration'>
          {time}
        </p>
      </div>
    </li>
  );
};

export default MoviesCard;
