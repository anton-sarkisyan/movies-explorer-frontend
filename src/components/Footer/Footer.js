import React from 'react';
import './footer.css';

const Footer = () => (
    <div className='footer'>
      <p className='footer__title'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>

      <div className='footer__items'>
        <p className='footer__copyright'>© 2021</p>
        <ul className='footer__links'>
          <li>
            <a
              href='https://practicum.yandex.ru'
              className='footer__link'
              target="_blank"
              rel="noreferrer">
              Яндекс.Практикум
            </a>
          </li>

          <li>
            <a
              href='https://github.com/anton-sarkisyan'
              className='footer__link'
              target="_blank"
              rel="noreferrer">
              Github
            </a>
          </li>

          <li>
            <a
              href='https://t.me/anton_sarkisyan'
              className='footer__link'
              target="_blank"
              rel="noreferrer">
              Telegram
            </a>
          </li>
        </ul>
      </div>
    </div>
);

export default Footer;
