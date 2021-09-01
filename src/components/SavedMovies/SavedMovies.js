import React, { useContext, useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SavedMoviesContext from '../../context/SavedMoviesContext';
import filterMovies, { filterShortMovie } from '../../utils/filterMovies';

import './savedMovies.css';
import { SEARCH_NOT_FOUND } from '../../constants/searchText';

const SavedMovies = ({ handleDeleteCard }) => {
  const savedMovies = useContext(SavedMoviesContext);
  const [dataMovies, setDataMovies] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [responseText, setResponseText] = useState('');
  const [isSwitchShortMovie, setIsSwitchShortMovie] = useState(false);

  const changeKeyDataMovies = () => savedMovies.map((movie) => ({
    id: movie.movieId,
    image: {
      url: movie.image,
    },
    nameRU: movie.nameRU,
    duration: movie.duration,
    trailerLink: movie.trailer,
    movieId: movie._id,
  }));

  const switchShortMovie = () => {
    if (!isSwitchShortMovie && dataMovies) {
      const filtered = filterShortMovie(dataMovies);
      setDataMovies(filtered);
    }

    if (isSwitchShortMovie && dataMovies) {
      const data = changeKeyDataMovies(savedMovies);
      setDataMovies(data.reverse());
    }

    setIsSwitchShortMovie((prevState) => !prevState);
  };

  useEffect(() => {
    const data = changeKeyDataMovies();
    setDataMovies(data.reverse());
  }, [savedMovies]);

  const handleSearchButton = (e) => {
    e.preventDefault();
    const data = changeKeyDataMovies();

    const filteredMovies = filterMovies(data, inputValue, isSwitchShortMovie);
    setResponseText(filteredMovies.length === 0 && SEARCH_NOT_FOUND);
    setDataMovies(filteredMovies.reverse());
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

      <div className='saved-movies__movies-card-block'>
        {responseText
          ? (<p className='saved-movies__not-found'>Ничего не найдено</p>)
          : (<MoviesCardList
            handleClickButton={handleDeleteCard}
            isSaved
            data={dataMovies} />)
        }
      </div>
    </div>
  );
};
export default SavedMovies;
