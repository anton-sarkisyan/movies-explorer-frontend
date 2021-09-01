import React, { useEffect, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import ButtonUpload from './ButtonUpload/ButtonUpload';

import getMoviesData from '../../utils/MoviesApi';
import filterMovies, { filterShortMovie } from '../../utils/filterMovies';
import useWindowWidth from '../../hooks/useWindowWidth';

import './movies.css';
import { ERROR_SEARCH_TEXT, SEARCH_NOT_FOUND } from '../../constants/searchText';

const Movies = ({ handleLikeClick }) => {
  const windowWidth = useWindowWidth();
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [cardCount, setCardCount] = useState(0);
  const [isSwitchShortMovie, setIsSwitchShortMovie] = useState(false);

  const switchShortMovie = () => {
    if (!isSwitchShortMovie && movies) {
      const filtered = filterShortMovie(movies);
      setMovies(filtered);
    }

    if (isSwitchShortMovie && movies) {
      const data = JSON.parse(localStorage.getItem('movies'));
      setMovies(data);
    }
    setIsSwitchShortMovie((prevState) => !prevState);
  };

  const handleButtonShowMore = () => {
    windowWidth >= 1280
    && setCardCount(cardCount + 3);

    windowWidth >= 320
    && windowWidth < 1280 && setCardCount(cardCount + 2);
  };

  useEffect(() => {
    windowWidth >= 1280
    && setCardCount(12);

    windowWidth >= 768
    && windowWidth < 1280 && setCardCount(8);

    windowWidth >= 320
    && windowWidth < 768 && setCardCount(5);
  }, [windowWidth]);

  useEffect(() => {
    const data = localStorage.getItem('movies') !== null
      ? JSON.parse(localStorage.getItem('movies'))
      : [];
    setMovies(data);
  }, []);

  const handleSearchButton = (e) => {
    e.preventDefault();

    setIsLoading(true);
    getMoviesData()
      .then((data) => {
        const filteredMovies = filterMovies(data, inputValue, isSwitchShortMovie);
        filteredMovies.length === 0 && setResponseText(SEARCH_NOT_FOUND);
        setMovies(filteredMovies);
        localStorage.setItem('movies', JSON.stringify(filteredMovies));
      })
      .catch((error) => {
        setMovies([]);
        localStorage.removeItem('movies');
        setResponseText(ERROR_SEARCH_TEXT);
        `Ошибка ${error} при запросе фильмов`;
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <SearchForm
        inputValue={inputValue}
        handleInputValue={(e) => setInputValue(e.target.value)}
        handleSearchButton={handleSearchButton}
        switchShortMovie={switchShortMovie}
        isSwitchOn={isSwitchShortMovie}
      />
      <div className='movies_movies-card-block'>
        {isLoading ? (<Preloader />)
          : movies.length > 0
            ? (<MoviesCardList
              handleClickButton={handleLikeClick}
              data={movies.slice(0, cardCount)} />)
            : (<p className='movies__not-found'>
              {responseText}
            </p>)
        }
      </div>
      <div className='movies_button-block'>
        {movies.length > 3 && cardCount < movies.length
        && (
          <ButtonUpload
            handleButtonShowMore={handleButtonShowMore}
          />
        )}
      </div>
    </div>
  );
};

export default Movies;
