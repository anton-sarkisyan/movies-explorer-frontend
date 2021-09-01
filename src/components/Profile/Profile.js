import React, { useContext, useEffect, useState } from 'react';
import CurrentUserContext from '../../context/CurrentUserContext';
import useFormWithValidation from '../../hooks/useValidationForm';
import Error from '../Error/Error';
import Preloader from '../Preloader/Preloader';
import { updateProfile } from '../../utils/MainApi';
import './profile.css';
import { UPDATE_PROFILE_ERROR } from '../../constants/searchText';

const Profile = ({ handleLogout, handleSetCurrentUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const {
    values, handleChange, errors, isValid, updateValue,
  } = useFormWithValidation();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleButtonEdit = (name, email) => {
    setIsLoading(true);
    updateProfile(name, email)
      .then((result) => {
        setServerError({});
        handleSetCurrentUser(result);
      })
      .catch(() => setServerError(UPDATE_PROFILE_ERROR))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    updateValue('profileName', currentUser.name);
    updateValue('profileEmail', currentUser.email);
  }, [currentUser]);

  // При обновлении профиля произошла ошибка.
  const isFormInvalid = !isValid
    || ((values.profileEmail === currentUser.email)
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
              value={values.profileName}
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
              value={values.profileEmail}
              name='profileEmail'
              className='profile__input'
              id='email'
              type='email'
              onChange={handleChange}
              required
            />
          </div>
          <div className='profile__errors-block'>
            <Error text={errors.profileEmail} />
          </div>
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
            disabled={isFormInvalid}
            onClick={() => handleButtonEdit(values.profileEmail, values.profileName)}
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
