import React from 'react';
import './movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ButtonUpload from './ButtonUpload/ButtonUpload';

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
  {
    title: 'Киноальманах «100 лет дизайна»',
    time: '1ч 3м',
    img: 'https://clck.ru/WasXY',
  }, {
    title: 'Киноальманах «100 лет дизайна»',
    time: '1ч 3м',
    img: 'https://clck.ru/WasXY',
  },
  {
    title: 'Киноальманах «100 лет дизайна»',
    time: '1ч 3м',
    img: 'https://clck.ru/WasXY',
  }, {
    title: 'Киноальманах «100 лет дизайна»',
    time: '1ч 3м',
    img: 'https://clck.ru/WasXY',
  }, {
    title: 'Киноальманах «100 лет дизайна»',
    time: '1ч 3м',
    img: 'https://clck.ru/WasXY',
  }, {
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

const Movies = () => (
    <div>
      <SearchForm/>
      <div className='movies_movies-card-block'>
        <MoviesCardList data={data}/>
      </div>
      <div className='movies_button-block'>
        <ButtonUpload/>
      </div>
    </div>
);

export default Movies;
