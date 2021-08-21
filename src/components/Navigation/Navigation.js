import React from 'react';
import './navigation.css';
import { NavLink } from 'react-router-dom';

const Navigation = ({ handleCloseMenu, isOpenMenu }) => (
    <div className={`navigation ${isOpenMenu && 'navigation_open'}`}>
      <div
        className='navigation__close-icon'
        onClick={handleCloseMenu}
      />
      <nav>
        <ul className='navigation__menu'>
          <li className='navigation__item'>
            <NavLink
              exact to='/'
              className='navigation__link'
              activeClassName='navigation__link_active'
            >
              Главная
            </NavLink>
          </li>
          <li className='navigation__item'>
            <NavLink
              to='/movies'
              className='navigation__link'
              activeClassName='navigation__link_active'
            >
              Фильмы
            </NavLink>
          </li>
          <li className='navigation__item'>
            <NavLink
              to='/saved-movies'
              className='navigation__link'
              activeClassName='navigation__link_active'>
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className='navigation__account-items'>
        <NavLink
          to='/profile'
          className='navigation__account'>
          <button
            type='button'
            className='navigation__account-button'>
            Аккаунт
          </button>
          <div className='navigation__account-icon'>
            <div className='navigation__account-icon-svg'/>
          </div>
        </NavLink>
      </div>
    </div>
);

export default Navigation;
