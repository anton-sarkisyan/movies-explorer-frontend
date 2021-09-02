import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Error from '../Error/Error';
import { signUp, signIn } from '../../utils/MainApi';
import useFormWithValidation from '../../hooks/useValidationForm';
import Preloader from '../Preloader/Preloader';
import './authForm.css';

const AuthForm = ({
  title, button, text, link, nameLink, isSignup, handleLoggedIn,
}) => {
  const history = useHistory();
  const {
    values, handleChange, errors, isValid, resetForm,
  } = useFormWithValidation();
  const [serverError, setServerError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = () => {
    signUp(values.password, values.email, values.name)
      .then(() => {
        signIn(values.password, values.email)
          .then(() => {
            setServerError({});
            resetForm();
            handleLoggedIn();
            history.push('/movies');
          })
          .catch(() => 'При авторизации произошла ошибка');
      })
      .catch((error) => {
        let textError;
        error === 409
          ? textError = 'Пользователь с таким email уже существует'
          : error === 400
            ? textError = 'Данные заполнены неверно'
            : textError = 'При регистрации пользователя произошла ошибка';
        setServerError({ ...serverError, signUp: textError });
      })
      .finally(() => setIsLoading(false));
  };

  const handleSignIn = () => {
    signIn(values.password, values.email)
      .then(() => {
        setServerError({});
        resetForm();
        handleLoggedIn();
        history.push('/movies');
      })
      .catch((error) => {
        const textError = error === 401
          ? 'Вы ввели неправильный логин или пароль'
          : 'При авторизации произошла ошибка';
        setServerError({ ...serverError, login: textError });
      })
      .finally(() => setIsLoading(false));
  };

  const handleClickButton = (e) => {
    e.preventDefault();
    setIsLoading(true);

    isSignup
      ? handleSignUp()
      : handleSignIn();
  };

  return (
    <div className='auth-form'>
      <div className='auth-form__preloader-block'>
        {isLoading && <Preloader />}
      </div>
      <h1 className='auth-form__title'>
        {title}
      </h1>

      <form className='auth-form__form'>
        <div className='auth-form__form-items'>
          {isSignup && (
            <div>
              <div className='auth-form__input-items'>
                <label
                  className='auth-form__input-label'
                  htmlFor='name'>
                  Имя
                </label>
                <input
                  type='text'
                  className={`auth-form__input ${errors.name && 'auth-form__input_error'}`}
                  id='name'
                  name='name'
                  value={values.name || ''}
                  onChange={handleChange}
                  pattern={'[A-Za-zА-Яа-яЁё]+([ -][A-Za-zА-Яа-яЁё]+)?'}
                  minLength={2}
                  maxLength={30}
                  required
                />
              </div>
              <div className='auth-form__error'>
                <Error text={errors.name} />
              </div>
            </div>
          )}

          <div>
            <div className='auth-form__input-items'>
              <label
                className='auth-form__input-label'
                htmlFor='e-mail'>
                E-mail
              </label>
              <input
                type='email'
                className={`auth-form__input ${errors.email && 'auth-form__input_error'}`}
                id='e-mail'
                name='email'
                value={values.email || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className='auth-form__error'>
              <Error text={errors.email} />
            </div>
          </div>

          <div>
            <div className='auth-form__input-items'>
              <label
                className='auth-form__input-label'
                htmlFor='password'>
                Пароль
              </label>
              <input
                type='password'
                className={`auth-form__input ${errors.password && 'auth-form__input_error'}`}
                id='password'
                name='password'
                value={values.password || ''}
                onChange={handleChange}
                minLength={8}
                required
              />
            </div>
            <div className='auth-form__error'>
              <Error text={errors.password} />
            </div>
          </div>
        </div>

        <div className='auth-form__button-block'>
          <Error text={isSignup ? serverError.signUp : serverError.login} />
          <button
            type='submit'
            onClick={handleClickButton}
            className={
              `auth-form__button
            ${!isValid && 'auth-form__button_disable'}
          `}
            disabled={!isValid}
          >
            {button}
          </button>
        </div>

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
};

export default AuthForm;
