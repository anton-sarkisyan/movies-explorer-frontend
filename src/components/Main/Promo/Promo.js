import React from 'react';
import './promo.css';

const Promo = () => {
  const handleClickButton = () => {
    document.getElementById('about-project')
      .scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='promo'>
      <h1 className='promo__title'>
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <div className='promo__logo'/>
      <p className='promo__subtitle'>
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
      </p>
      <button
        type='button'
        className='promo__button'
        onClick={handleClickButton}>
        <span
          type='button'
          className='promo__link'>
          Узнать больше
        </span>
      </button>
    </div>
  );
};

export default Promo;
