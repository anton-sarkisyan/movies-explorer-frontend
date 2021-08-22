import React, { useEffect, useState } from 'react';
import './header.css';
import {
  NavLink, Link, Switch, Route,
} from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

const Header = ({ isLoggin }) => {
  const [windowWidth, setWindowWidth] = useState(window?.innerWidth);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleResizeWindow = () => {
    setWindowWidth(window?.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResizeWindow);
    return () => window.removeEventListener('resize', handleResizeWindow);
  });

  return (
    <Switch>
      <Route path='/signin'>
        <div
          className='
          header
          header_theme_light
          header_auth'
        >
          <Link
            to='/'
            className='header__logo'/>
        </div>
      </Route>

      <Route path='/signup'>
        <div
          className='
          header
          header_theme_light
          header_auth'
        >
          <Link
            to='/'
            className='header__logo'/>
        </div>
      </Route>

      <Route path='/'>
        <div
          className={`
          header
          ${isLoggin && windowWidth > 1279 && 'header_theme_light'}
          ${isLoggin && windowWidth < 1280 && 'header_theme_mobile'}`}>
          <Link
            to='/'
            className='header__logo'/>
          {isLoggin && windowWidth > 1279 && (
            <nav className='header__nav-links'>
              <NavLink
                to='/movies'
                activeClassName='header__link_theme_light-active'
                className='
                header__link
                header__link_theme_light'>
                Фильмы
              </NavLink>

              <NavLink
                to='/saved-movies'
                activeClassName='header__link_theme_light-active'
                className='
                header__link
                header__link_theme_light'>
                Сохраненные фильмы
              </NavLink>
            </nav>
          )}

          {isLoggin && windowWidth < 1280
            ? (
              <div
                onClick={() => setIsOpenMenu(true)}
                className='header__menu-mobile'/>)
            : (<div
              className={`
              header__links
              ${isLoggin && 'header__links_theme_light'}`}>
              {isLoggin
                ? (
                  <Link
                    to='/profile'
                    className='header__account'>
                    <button
                      type='button'
                      className='header__account-button'>
                      Аккаунт
                    </button>
                    <div className='header__account-icon'>
                      <div className='header__account-icon-svg'/>
                    </div>
                  </Link>)
                : (
                  <>
                    <Link
                      className='header__link'
                      to='/signup'>
                      Регистрация
                    </Link>
                    <Link
                      className='
                    header__link
                    header__link_type_button-green'
                      to='/signin'>
                      Войти
                    </Link>
                  </>)
              }
            </div>)
          }
        </div>
        <Navigation
          isOpenMenu={isOpenMenu}
          handleCloseMenu={() => setIsOpenMenu(false)}/>
      </Route>
    </Switch>
  );
};

export default Header;
