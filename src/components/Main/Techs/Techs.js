import React from 'react';
import './techs.css';

const Techs = () => (
    <div className='techs'>
      <h2 className='techs__section-name'>
        Технологии
      </h2>

      <p className='techs__title'>
        7 технологий
      </p>

      <p className='techs__subtitle'>
        На курсе веб-разработки мы освоили технологии, которые применили
        <br/>
        в дипломном проекте.
      </p>

      <ul className='techs__skills'>
        <li className='techs__skill'>
          <p className='techs__skill-text'>
            HTML
          </p>
        </li>

        <li className='techs__skill'>
          <p className='techs__skill-text'>
            CSS
          </p>
        </li>

        <li className='techs__skill'>
          <p className='techs__skill-text'>
            JS
          </p>
        </li>

        <li className='techs__skill'>
          <p className='techs__skill-text'>
            React
          </p>
        </li>

        <li className='techs__skill'>
          <p className='techs__skill-text'>
            Git
          </p>
        </li>

        <li className='techs__skill'>
          <p className='techs__skill-text'>
            Express.js
          </p>
        </li>

        <li className='techs__skill'>
          <p className='techs__skill-text'>
            mongoDB
          </p>
        </li>
      </ul>

    </div>
);

export default Techs;
