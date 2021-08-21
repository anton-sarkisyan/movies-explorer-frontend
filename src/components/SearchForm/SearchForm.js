import React, { useState } from 'react';
import './searchForm.css';

const SearchForm = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  const handlerSwitch = () => {
    setIsSwitchOn((isSwitchOn) => !isSwitchOn);
  };

  return (
    <div className='search-form'>
      <div className='search-form__input-items'>
        <div className='search-icon'/>
        <input
          placeholder='Фильм'
          className='search-form__input'/>
        <div className='search-form__controls'>
          <div className='search-form__button-search'>
            <div className='search-form__search-arrow'/>
          </div>
          <div className='search-form__column'/>
          <div className='search-form__interface'>
            <div
              className={`search-form__switch
            ${!isSwitchOn && 'search-form__switch_type_off'}`}
              onClick={handlerSwitch}
            >
              <div className={`search-form__switch-circle
            ${!isSwitchOn && 'search-form__switch_type_off'}`}/>
            </div>
            <span className='search-form__text'>
            Короткометражки
          </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
