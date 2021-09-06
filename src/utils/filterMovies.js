export const filterShortMovie = (data) => data.filter((movie) => movie.duration <= 40);

const filterMovies = (data, value, isShortFilm) => data.filter((movie) => {
  const searched = movie.nameRU.toLowerCase().includes(value.trim().toLowerCase());
  return isShortFilm ? searched && (movie.duration <= 40) : searched;
});

export default filterMovies;
