import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import AuthForm from '../AuthForm/AuthForm';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
  return (
    <div className='App'>
      <Switch>

        <Route exact path='/'>
          <Header isLoggin={false}/>
          <Main/>
          <Footer/>
        </Route>

        <Route exact path='/movies'>
          <Header isLoggin={true}/>
          <Movies/>
          <Footer/>
        </Route>

        <Route exact path='/saved-movies'>
          <Header isLoggin={true}/>
          <SavedMovies/>
          <Footer/>
        </Route>

        <Route exact path='/profile'>
          <Header isLoggin={true}/>
          <Profile/>
        </Route>

        <Route exact path='/signup'>
          <Header/>
          <AuthForm
            isSignup
            link='/signin'
            title='Добро пожаловать!'
            button='Зарегистрироваться'
            text='Уже зарегистрированы?'
            nameLink='Войти'
          />
        </Route>

        <Route exact path='/signin'>
          <Header/>
          <AuthForm
            link='/signup'
            title='Рады видеть!'
            button='Войти'
            text='Ещё не зарегистрированы?'
            nameLink='Регистрация'
          />
        </Route>

        <Route path='*'>
          <PageNotFound/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
