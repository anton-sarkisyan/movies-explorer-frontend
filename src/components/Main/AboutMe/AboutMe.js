import React from 'react';
import './aboutMe.css';
import avatar from '../../../images/avatar.jpg';

const AboutMe = () => (
    <div className='about-me'>
      <h2 className='about-project__section-name'>
        Студент
      </h2>

      <div>
        <div className='about-me__items'>
          <div className='about-me__item'>
            <p className='about-me__title'>
              Антон
            </p>
            <p className='about-me__subtitle'>
              Веб-разработчик, 25 лет
            </p>
            <p className='about-me__description'>
              Для меня разработка – это искусство находить оптимальные решения на поставленные
              задачи и возможность создавать качественные продукты для людей,
              подобно художнику в живописи.
              Это уникальное сочетание с бесконечным потенциалом для саморазвития.
            </p>

            <ul className='about-me__social-networks'>
              <li>
                <a
                  className='about-me__social-network'
                  href='https://t.me/anton_sarkisyan'
                  target="_blank"
                  rel="noreferrer">
                  Telegram
                </a>
              </li>

              <li>
                <a
                  className='about-me__social-network'
                  href='https://github.com/anton-sarkisyan'
                  target="_blank"
                  rel="noreferrer">
                  Github
                </a>
              </li>
          </ul>
        </div>
        <img
          className='about-me__avatar'
          src={avatar}
          alt='Аватар студента'/>
      </div>
    </div>
</div>
);

export default AboutMe;
