import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Error from '../Error/Error';
import useFormWithValidation from '../../hooks/useValidationForm';
import Preloader from '../Preloader/Preloader';
import './register.css';

const Register = ({
  isLoading, handleClickButton, serverError, resetServerError,
}) => {
  const {
    values, handleChange, errors, isValid,
  } = useFormWithValidation();

  useEffect(() => {
    resetServerError();
  }, []);

  return (
    <div className='register'>
      <div className='register__preloader-block'>
        {isLoading && <Preloader />}
      </div>
      <h1 className='register__title'>
        Добро пожаловать!
      </h1>

      <form className='register__form'>
        <div className='register__form-items'>
          <div>
            <div className='register__input-items'>
              <label
                className='register__input-label'
                htmlFor='name'>
                Имя
              </label>
              <input
                type='text'
                className={`register__input ${errors.name && 'register__input_error'}`}
                id='name'
                name='name'
                value={values.name || ''}
                onChange={handleChange}
                pattern={'[A-Za-zА-Яа-яЁё]+([ -][A-Za-zА-Яа-яЁё]+)?'}
                minLength={2}
                maxLength={30}
                disabled={isLoading}
                required
              />
            </div>
            <div className='register__error'>
              <Error text={errors.name} />
            </div>
          </div>

          <div>
            <div className='register__input-items'>
              <label
                className='register__input-label'
                htmlFor='e-mail'>
                E-mail
              </label>
              <input
                autoComplete='new-email'
                type='email'
                className={`register__input ${(errors.email) && 'register__input_error'}`}
                id='e-mail'
                name='email'
                value={values.email || ''}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>
            <div className='register__error'>
              <Error text={errors.email} />
            </div>
          </div>

          <div>
            <div className='register__input-items'>
              <label
                className='register__input-label'
                htmlFor='password'>
                Пароль
              </label>
              <input
                autoComplete='new-password'
                type='password'
                className={`register__input ${errors.password && 'register__input_error'}`}
                id='password'
                name='password'
                value={values.password || ''}
                onChange={handleChange}
                minLength={8}
                required
                disabled={isLoading}
              />
            </div>
            <div className='register__error'>
              <Error text={errors.password} />
            </div>
          </div>
        </div>

        <div className='register__button-block'>
          <Error text={serverError} />
          <button
            type='submit'
            onClick={(e) => handleClickButton(e, values.password, values.email, values.name)}
            className={
              `register__button
            ${(!isValid || isLoading) && 'register__button_disable'}
          `}
            disabled={!isValid || isLoading}
          >
            Зарегистрироваться
          </button>
        </div>

        <p className='register__text'>
          Уже зарегистрированы?
          {' '}
          <Link
            className='register__text-link'
            to='/signin'>
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
