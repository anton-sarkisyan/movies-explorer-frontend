import React, { useContext, useEffect } from 'react';
import CurrentUserContext from '../../context/CurrentUserContext';
import useFormWithValidation from '../../hooks/useValidationForm';
import Error from '../Error/Error';
import Preloader from '../Preloader/Preloader';
import './profile.css';

const Profile = ({
  handleLogout, handleButtonEdit,
  success, serverError, isLoading, resetServerError,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const {
    values, handleChange, errors, isValid, updateValue,
  } = useFormWithValidation();

  useEffect(() => {
    resetServerError();
  }, []);

  useEffect(() => {
    updateValue('profileName', currentUser.name);
    updateValue('email', currentUser.email);
  }, [currentUser]);

  const isFormInvalid = !isValid
    || ((values.email === currentUser.email)
      && (values.profileName === currentUser.name));

  return (
    <div className='profile'>
      {isLoading && (
        <div className='profile__preloader-block'>
          <Preloader />
        </div>
      )}
      <div className='profile__form'>
        <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
        <form className='profile__form-items'>
          <div className='profile__form-item'>
            <label
              className='profile__label'
              htmlFor="name">
              Имя
            </label>
            <input
              className='profile__input'
              name='profileName'
              id='name'
              pattern={'[A-Za-zА-Яа-яЁё]+([ -][A-Za-zА-Яа-яЁё]+)?'}
              minLength={2}
              maxLength={30}
              onChange={handleChange}
              value={values.profileName || ''}
              disabled={isLoading}
              required
            />
          </div>
          <div className='profile__errors-block'>
            <Error text={errors.profileName} />
          </div>

          <hr className='profile_hr' />

          <div className='profile__form-item'>
            <label
              className='profile__label'
              htmlFor="email">
              Email
            </label>
            <input
              value={values.email || ''}
              name='email'
              className='profile__input'
              id='email'
              type='email'
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>
          <div className='profile__errors-block'>
            <Error text={errors.email} />
          </div>
          {success && (
            <p className='profile__success-text'>{success}</p>
          )}
        </form>

        <div className='
        profile__errors-block
        profile__errors-block_server-text'>
          <Error text={serverError} />
        </div>

        <div className='profile__buttons'>
          <button
            type='button'
            className={`profile__button ${isFormInvalid && 'profile__button_disable'}`}
            disabled={isFormInvalid || isLoading}
            onClick={() => handleButtonEdit(values.email, values.profileName)}
          >
            Редактировать
          </button>
          <button
            onClick={handleLogout}
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
};

export default Profile;
