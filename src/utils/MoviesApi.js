const responseCheck = (response) => (
  response.ok
    ? response.json()
    : Promise.reject((new Error(`Ошибка ${response.status}`)))
);

const getMoviesData = async () => {
  const response = await fetch('https://api.nomoreparties.co/beatfilm-movies');
  return responseCheck(response);
};

export default getMoviesData;
