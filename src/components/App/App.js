import React, { useEffect, useState } from 'react';
import './App.css';
import {
  Switch, Route, Redirect, useHistory,
} from 'react-router-dom';
import ProtectedRoute from '../ProtectRoute/ProtectRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';

import {
  deleteMovies, getSavedMovies, addNewMovie, getUserData, logout, updateProfile, signUp, signIn,
} from '../../utils/MainApi';

import CurrentUserContext from '../../context/CurrentUserContext';
import SavedMoviesContext from '../../context/SavedMoviesContext';
import { UPDATE_PROFILE_ERROR } from '../../constants/searchText';

const App = () => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState({});
  const [successUpdateUser, setSuccessUpdateUser] = useState('');

  const tokenCheck = () => {
    getUserData()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
        }
      })
      .catch(() => {
        setLoggedIn(false);
      });
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      getSavedMovies()
        .then((movies) => setSavedMovies(movies))
        .catch((error) => `Ошибка ${error} при получении сохраненных фильмов`);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      getUserData()
        .then((result) => setCurrentUser(result))
        .catch((err) => `Ошибка ${err} при получении данных пользователя`);
    }
  }, [loggedIn]);

  const filterDeletedCard = (movie) => {
    setSavedMovies((savedMovies) => savedMovies.filter((i) => +i.movieId !== +movie.id));
  };

  const handleDeleteCard = (movie) => {
    deleteMovies(movie.movieId)
      .then(() => {
        filterDeletedCard(movie);
      })
      .catch((error) => `Ошибка ${error} при удалениии фильма из сохраненных`);
  };

  const handleLikeClick = (movieCard) => {
    const movie = savedMovies.find((i) => +i.movieId === movieCard.id);

    if (movie) {
      deleteMovies(movie._id)
        .then(() => {
          filterDeletedCard(movieCard);
        })
        .catch((error) => `Ошибка ${error} при удалениии фильма из сохраненных`);
    } else {
      addNewMovie(movieCard)
        .then((result) => setSavedMovies([...savedMovies, result]))
        .catch((error) => `Ошибка ${error} при добавлении фильма в сохраненные`);
    }
  };

  const onUpdateUser = (name, email) => {
    setIsLoading(true);
    updateProfile(name, email)
      .then((result) => {
        setSuccessUpdateUser('Данные успешно отредактированы!');
        setTimeout(() => setSuccessUpdateUser(''), 3000);
        setServerError({});
        setCurrentUser(result);
      })
      .catch(() => setServerError({ profile: UPDATE_PROFILE_ERROR }))
      .finally(() => setIsLoading(false));
  };

  const onRegister = (password, email, name) => {
    signUp(password, email, name)
      .then(() => {
        signIn(password, email)
          .then(() => {
            setServerError({});
            setLoggedIn(true);
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

  const onLogin = (password, email) => {
    signIn(password, email)
      .then(() => {
        setServerError({});
        setLoggedIn(true);
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

  const handleClickSignInButton = (e, password, email) => {
    e.preventDefault();

    setIsLoading(true);
    onLogin(password, email);
  };

  const handleClickSignUpButton = (e, password, email, name) => {
    e.preventDefault();

    setIsLoading(true);
    onRegister(password, email, name);
  };

  const handleLogout = () => {
    logout()
      .then(() => {
        localStorage.removeItem('movies');
        setLoggedIn(false);
      });
  };

  const resetServerError = () => setServerError({});

  return (
    <div className='App'>
      <CurrentUserContext.Provider value={currentUser}>
        <SavedMoviesContext.Provider value={savedMovies}>
          <Switch>
            <Route exact path='/'>
              <Header isLoggin={loggedIn} />
              <Main />
              <Footer />
            </Route>

            <Route exact path='/movies'>
              <Header isLoggin={loggedIn} />
              <ProtectedRoute
                isLoggin={loggedIn}
                component={Movies}
                handleLikeClick={handleLikeClick}
              />
              <Footer />
            </Route>

            <Route exact path='/saved-movies'>
              <Header isLoggin={loggedIn} />
              <ProtectedRoute
                isLoggin={loggedIn}
                component={SavedMovies}
                handleDeleteCard={handleDeleteCard}
              />
              <Footer />
            </Route>

            <Route exact path='/profile'>
              <Header isLoggin={loggedIn} />
              <ProtectedRoute
                handleButtonEdit={onUpdateUser}
                success={successUpdateUser}
                serverError={serverError.profile}
                isLoading={isLoading}
                isLoggin={loggedIn}
                component={Profile}
                resetServerError={resetServerError}
                handleLogout={handleLogout}
              />
            </Route>

            <Route exact path='/signup'>
              {loggedIn
                ? (<Redirect to='/' />)
                : (<>
                  <Header />
                  <Register
                    resetServerError={resetServerError}
                    serverError={serverError.signUp}
                    handleClickButton={handleClickSignUpButton}
                    isLoading={isLoading}
                  />
                </>)
              }
            </Route>

            <Route exact path='/signin'>
              {loggedIn
                ? (<Redirect to='/' />)
                : (<>
                  <Header />
                  <Login
                    resetServerError={resetServerError}
                    serverError={serverError.login}
                    handleClickButton={handleClickSignInButton}
                    isLoading={isLoading}
                  />
                </>)
              }
            </Route>
            <Route path='*'>
              <PageNotFound />
            </Route>
          </Switch>
        </SavedMoviesContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
