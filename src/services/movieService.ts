import { api } from './api';

export const fetchPopularMovies = async () => {
  try {
    const response = await api.get('/movie/popular', {
      params: {
        language: 'pt-BR',
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar filmes populares', error);
    throw error;
  }
};

export const fetchUpcomingMovies = async () => {
  try {
    const response = await api.get('/movie/upcoming', {
      params: {
        language: 'pt-BR',
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar filmes em cartaz', error);
    throw error;
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    const response = await api.get('/movie/top_rated', {
      params: {
        language: 'pt-BR',
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar filmes mais votados', error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId: number) => {
  try {
    const response = await api.get(`/movie/${movieId}`, {
      params: {
        language: 'pt-BR',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar detalhes do filme', error);
    throw error;
  }
};
