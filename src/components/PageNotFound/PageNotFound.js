import React from 'react';
import './pageNotFound.css';
import { useHistory } from 'react-router-dom';

const PageNotFound = () => {
  const history = useHistory();

  return (
    <div className='page-not-found'>
      <h1 className='page-not-found__title'>
        404
      </h1>
      <p className='page-not-found__subtitle'>
        Страница не найдена
      </p>
      <button
        onClick={() => history.goBack()}
        className='page-not-found__button'
        type='button'>
        Назад
      </button>
    </div>
  );
};

export default PageNotFound;
