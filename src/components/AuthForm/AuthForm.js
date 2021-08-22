import React from 'react';
import './authForm.css';
import { Link } from 'react-router-dom';
import Error from '../Error/Error';

const AuthForm = ({
  title, button, text, link, nameLink, isSignup,
}) => (
    <div className='auth-form'>
      <h1 className='auth-form__title'>
        {title}
      </h1>

      <form className='auth-form__form'>
        <div className='auth-form__form-items'>
          {isSignup && (
            <div className='auth-form__input-items'>
              <label
                className='auth-form__input-label'
                htmlFor='name'>
                Имя
              </label>
              <input
                type='text'
                className='auth-form__input'
                id='name'
                required
              />
            </div>
          )}

          <div className='auth-form__input-items'>
            <label
              className='auth-form__input-label'
              htmlFor='e-mail'>
              E-mail
            </label>
            <input
              type='email'
              className='auth-form__input'
              id='e-mail'
              required
            />
          </div>

          <div className='auth-form__input-items'>
            <label
              className='auth-form__input-label'
              htmlFor='password'>
              Пароль
            </label>
            <input
              type='password'
              className='auth-form__input auth-form__input_error'
              id='password'
              required
            />
          </div>
        </div>

        <div className='auth-form__error'>
          <Error/>
        </div>

        <button
          type='submit'
          className='auth-form__button'>
          {button}
        </button>
        <p className='auth-form__text'>
          {text}
          {' '}
          <Link
            className='auth-form__text-link'
            to={link}>
            {nameLink}
          </Link>
        </p>
      </form>
    </div>
);

export default AuthForm;
