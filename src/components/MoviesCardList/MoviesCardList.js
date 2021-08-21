import React from 'react';
import './moviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ data, isSaved }) => (
    <ul className='movies-card-list'>
      {data.map((card, index) => (
        <MoviesCard
          isSaved={isSaved}
          key={index}
          title={card.title}
          time={card.time}
          src={card.img}
        />
      ))}
    </ul>
);

export default MoviesCardList;
