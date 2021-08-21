import React from 'react';
import './profile.css';

const Profile = () => (
    <div className='profile'>
      <div className='profile__form'>
        <h1 className='profile__title'>Привет, Виталий!</h1>
        <form className='profile__form-items'>
          <div className='profile__form-item'>
            <label
              className='profile__label'
              htmlFor="name">
              Имя
            </label>
            <input
              className='profile__input'
              id='name'
            />
          </div>

          <hr className='profile_hr'/>

          <div className='profile__form-item'>
            <label
              className='profile__label'
              htmlFor="email">
              Email
            </label>
            <input
              className='profile__input'
              id='email'
            />
          </div>
        </form>
        <div className='profile__buttons'>
          <button
            type='button'
            className='profile__button'>
            Редактировать
          </button>
          <button
            type='button'
            className='
            profile__button
            profile__button_type_exit'>
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
);

export default Profile;
