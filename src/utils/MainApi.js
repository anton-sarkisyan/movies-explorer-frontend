import { BASE_URL, MOVIE_API_URL } from '../constants/constants';

const responseCheck = (response) => (
  response.ok
    ? response.json()
    : Promise.reject((response.status))
);

export const signUp = async (password, email, name) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      password,
      email,
    }),
    credentials: 'include',
  });
  return responseCheck(response);
};

export const signIn = async (password, email) => {
  const response = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
      email,
    }),
    credentials: 'include',
  });
  return responseCheck(response);
};

export const getUserData = async () => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    credentials: 'include',
  });
  return responseCheck(response);
};

export const updateProfile = async (email, name) => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
    }),
    credentials: 'include',
  });
  return responseCheck(response);
};

export const getSavedMovies = async () => {
  const response = await fetch(`${BASE_URL}/movies`, {
    credentials: 'include',
  });
  return responseCheck(response);
};

export const addNewMovie = async (movie) => {
  const response = await fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: MOVIE_API_URL + movie.image.url,
      trailer: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: MOVIE_API_URL + movie.image.formats.thumbnail.url,
      movieId: movie.id.toString(),
    }),
    credentials: 'include',
  });
  return responseCheck(response);
};

export const deleteMovies = async (id) => {
  const response = await fetch(`${BASE_URL}/movies/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return responseCheck(response);
};

export const logout = async () => {
  const response = await fetch(`${BASE_URL}/users/signout`, {
    method: 'DELETE',
    credentials: 'include',
  });

  return responseCheck(response);
};
