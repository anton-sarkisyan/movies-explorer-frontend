import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Error from '../Error/Error';
import useFormWithValidation from '../../hooks/useValidationForm';
import Preloader from '../Preloader/Preloader';
import './login.css';

const Login = ({
  isLoading, handleClickButton, serverError, resetServerError,
}) => {
  const {
    values, handleChange, errors, isValid,
  } = useFormWithValidation();

  useEffect(() => {
    resetServerError();
  }, []);

  return (
    <div className='login'>
      <div className='login__preloader-block'>
        {isLoading && <Preloader />}
      </div>
      <h1 className='login__title'>
        Рады видеть!
      </h1>

      <form className='login__form'>
        <div className='login__form-items'>
          <div>
            <div className='login__input-items'>
              <label
                className='login__input-label'
                htmlFor='e-mail'>
                E-mail
              </label>
              <input
                autoComplete='new-email'
                type='email'
                className={`login__input ${(errors.email) && 'login__input_error'}`}
                id='e-mail'
                name='email'
                value={values.email || ''}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>
            <div className='login__error'>
              <Error text={errors.email} />
            </div>
          </div>

          <div>
            <div className='login__input-items'>
              <label
                className='login__input-label'
                htmlFor='password'>
                Пароль
              </label>
              <input
                autoComplete='new-password'
                type='password'
                className={`login__input ${errors.password && 'login__input_error'}`}
                id='password'
                name='password'
                value={values.password || ''}
                onChange={handleChange}
                minLength={8}
                required
                disabled={isLoading}
              />
            </div>
            <div className='login__error'>
              <Error text={errors.password} />
            </div>
          </div>
        </div>

        <div className='login__button-block'>
          <Error text={serverError} />
          <button
            type='submit'
            onClick={(e) => handleClickButton(e, values.password, values.email)}
            className={
              `login__button
            ${(!isValid || isLoading) && 'login__button_disable'}
          `}
            disabled={!isValid || isLoading}
          >
            Войти
          </button>
        </div>

        <p className='login__text'>
          Ещё не зарегистрированы?
          {' '}
          <Link
            className='login__text-link'
            to={'/signup'}>
            Регистрация
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
