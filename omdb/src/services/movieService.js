const API_KEY = import.meta.env.VITE_OMDB_APIKEY;
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (searchTerm, page = 1) => {
  try {
    const url = `${BASE_URL}?apikey=${API_KEY}&s=${searchTerm}&page=${page}`;
    console.log('Fetching:', url); // Для отладки
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API data:', data); // Для отладки
    
    if (data.Response === 'False') {
      throw new Error(data.Error || 'Ошибка поиска');
    }
    
    return data;
  } catch (error) {
    console.error('searchMovies error:', error);
    throw error;
  }
};

export const getMovieDetails = async (imdbID) => {
  try {
    const url = `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}`;
    console.log('Fetching details:', url); // Для отладки
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.Response === 'False') {
      throw new Error(data.Error || 'Фильм не найден');
    }
    
    return data;
  } catch (error) {
    console.error('getMovieDetails error:', error);
    throw error;
  }
};
