import React from 'react';
import './moviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { MOVIE_API_URL } from '../../constants/constants';

const MoviesCardList = ({ data, isSaved, handleClickButton }) => (
    <ul className='movies-card-list'>
      {data.map((movie) => (
        <MoviesCard
          handleClickButton={handleClickButton}
          isSaved={isSaved}
          movie={movie}
          key={movie.id}
          title={movie.nameRU}
          time={movie.duration}
          src={isSaved
            ? movie?.image?.url
            : MOVIE_API_URL + movie?.image?.url}
          link={movie.trailerLink}
        />
      ))}
    </ul>
);

export default MoviesCardList;
