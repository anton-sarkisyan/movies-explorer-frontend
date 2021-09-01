import React, { useEffect, useState } from 'react';
import './App.css';
import {
  Switch, Route, useHistory, Redirect,
} from 'react-router-dom';
import ProtectedRoute from '../ProtectRoute/ProtectRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import AuthForm from '../AuthForm/AuthForm';
import PageNotFound from '../PageNotFound/PageNotFound';
import {
  deleteMovies, getSavedMovies, addNewMovie, getUserData, logout,
} from '../../utils/MainApi';

import CurrentUserContext from '../../context/CurrentUserContext';
import SavedMoviesContext from '../../context/SavedMoviesContext';

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const history = useHistory();

  const handleSetCurrentUser = (data) => setCurrentUser(data);

  const tokenCheck = () => {
    getUserData()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
        }
      })
      .catch(() => {
        setLoggedIn(false);
        history.push('/');
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

  const handleLoggedIn = () => setLoggedIn(true);
  const handleLogout = () => {
    logout()
      .then(() => {
        setLoggedIn(false);
      });
  };

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
                isLoggin={loggedIn}
                component={Profile}
                handleLogout={handleLogout}
                handleSetCurrentUser={handleSetCurrentUser}/>
            </Route>

            <Route exact path='/signup'>
              {loggedIn
                ? (<Redirect to='/movies' />)
                : (<>
                  <Header />
                  <AuthForm
                    isSignup
                    link='/signin'
                    title='Добро пожаловать!'
                    button='Зарегистрироваться'
                    text='Уже зарегистрированы?'
                    nameLink='Войти'
                  />
                </>)
              }
            </Route>

            <Route exact path='/signin'>
              {loggedIn
                ? (<Redirect to='/movies'/>)
                : (<>
                  <Header />
                  <AuthForm
                    handleLoggedIn={handleLoggedIn}
                    link='/signup'
                    title='Рады видеть!'
                    button='Войти'
                    text='Ещё не зарегистрированы?'
                    nameLink='Регистрация'
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
