import React from 'react';
import './portfolio.css';

const Portfolio = () => (
    <div className='portfolio'>
      <h2 className='portfolio__section-name'>
        Портфолио
      </h2>

      <ul className='portfolio__items'>
        <li className='portfolio__item'>
          <a
            target="_blank"
            rel="noreferrer"
            className='portfolio__link'
            href='https://anton-sarkisyan.github.io/how-to-learn/'>
            Статичный сайт
          </a>
          <a
            className='portfolio__link'
            href='https://anton-sarkisyan.github.io/how-to-learn/'
            rel="noreferrer"
            target='_blank'>
            <div className='portfolio__icon'/>
          </a>
        </li>

        <li className='portfolio__item'>
          <a
            className='portfolio__link'
            href='https://anton-sarkisyan.github.io/russian-travel/'
            rel="noreferrer"
            target='_blank'>
            Адаптивный сайт
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            className='portfolio__link'
            href='https://anton-sarkisyan.github.io/russian-travel/'>
            <div className='portfolio__icon'/>
          </a>
        </li>

        <li className='portfolio__item'>
          <a
            target="_blank"
            rel="noreferrer"
            className='portfolio__link'
            href='https://anton-sarkisyan.github.io/react-mesto-auth'>
            Одностраничное приложение
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            className='portfolio__link'
            href='https://anton-sarkisyan.github.io/react-mesto-auth'>
            <div className='portfolio__icon'/>
          </a>
        </li>
      </ul>
    </div>
);

export default Portfolio;
