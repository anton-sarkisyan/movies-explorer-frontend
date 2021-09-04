import React from 'react';
import Error from '../Error/Error';
import './searchForm.css';

const SearchForm = ({
  handleSearchButton,
  isSwitchOn,
  switchShortMovie,
  handleInputValue,
  inputValue,
  isLoading,
  error,
}) => (
    <form
      onSubmit={handleSearchButton}
      className='search-form'>
      <div className='search-form__input-items'>
        <div className='search-icon' />
        <input
          value={inputValue}
          onChange={handleInputValue}
          placeholder='Фильм'
          className='search-form__input'
        />
        <div className='search-form__controls'>
          <button
            disabled={isLoading}
            type='submit'
            className='search-form__button-search'>
            <div className='search-form__search-arrow' />
          </button>
          <div className='search-form__column' />
          <div className='search-form__interface'>
            <div
              className={`search-form__switch
            ${!isSwitchOn && 'search-form__switch_type_off'}`}
              onClick={switchShortMovie}
            >
              <div className={`search-form__switch-circle
            ${!isSwitchOn && 'search-form__switch_type_off'}`} />
            </div>
            <span className='search-form__text'>
            Короткометражки
          </span>
          </div>
        </div>
      </div>
      <div className='search-form__error'>
        <Error text={error} />
      </div>
    </form>
);

export default SearchForm;
