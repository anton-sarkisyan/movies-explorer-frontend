import React, { useContext } from 'react';
import SavedMoviesContext from '../../context/SavedMoviesContext';

import './moviesCard.css';

const MoviesCard = ({
  src, title, time, isSaved, link, handleClickButton, movie,
}) => {
  const savedMovies = useContext(SavedMoviesContext);
  const isLiked = savedMovies.find((i) => +i.movieId === movie.id);

  const getTimeFromMinutes = (mins) => {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;
    return hours
      ? minutes
        ? `${hours}ч ${minutes}м`
        : `${hours}ч`
      : `${minutes}м`;
  };

  return (
    <li className='card'>
      <a
        className='card__img-link'
        target='_blank'
        rel="noreferrer"
        href={link}>
        <img
          alt={title}
          src={src}
          className='card__img' />
      </a>
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
                onClick={() => handleClickButton(movie)}
              />
            )
            : (
              <button
                type='button'
                className={
                  `card__button
                  card__button_type_like
                  ${isLiked && 'card__button_type_like-on'}`
                }
                onClick={() => handleClickButton(movie)}
              />
            )
          }
        </div>
        <p className='card__duration'>
          {getTimeFromMinutes(time)}
        </p>
      </div>
    </li>
  );
};

export default MoviesCard;
