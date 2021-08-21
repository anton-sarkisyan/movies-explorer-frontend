import React from 'react';
import './savedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const data = [
  {
    title: 'Киноальманах «100 лет дизайна»',
    time: '1ч 3м',
    img: 'https://clck.ru/WasXY',
  },
  {
    title: 'Киноальманах «100 лет дизайна»',
    time: '1ч 3м',
    img: 'https://clck.ru/WasXY',
  },
  {
    title: 'Киноальманах «100 лет дизайна»',
    time: '1ч 3м',
    img: 'https://clck.ru/WasXY',
  },
];

const SavedMovies = () => (
    <div>
      <SearchForm/>
      <div className='saved-movies__movies-card-block'>
        <MoviesCardList
          isSaved
          data={data}/>
      </div>
    </div>
);

export default SavedMovies;
