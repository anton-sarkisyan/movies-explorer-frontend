import React from 'react';
import './aboutProject.css';

const AboutProject = () => (
    <div id='about-project' className='about-project'>
      <h2 className='about-project__section-name'>
        О проекте
      </h2>
      <div className='about-project__description-columns'>

        <div className='about-project__description'>
          <p className='about-project__description-subtitle'>
            Дипломный проект включал 5 этапов
          </p>

          <p className='about-project__description-text'>
            Составление плана, работу над бэкендом, вёрстку,
            добавление функциональности и финальные доработки.
          </p>
        </div>

        <div className='about-project__description'>
          <p className='about-project__description-subtitle'>
            На выполнение диплома ушло 5 недель
          </p>

          <p className='about-project__description-text'>
            У каждого этапа был мягкий и жёсткий дедлайн,
            которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>

      <div className='about-project__info'>
        <div>
          <p
            className='
            about-project__info-week
            about-project__info-week_color_green'>
            1 неделя
          </p>
          <p className='info-week__info-text'>
            Back-end
          </p>
        </div>

        <div>
          <p className='about-project__info-week'>
            4 недели
          </p>
          <p className='info-week__info-text'>
            Front-end
          </p>
        </div>
      </div>
    </div>
);

export default AboutProject;
