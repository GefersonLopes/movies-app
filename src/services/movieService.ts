import { api } from './api';

export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await api.get('/movie/popular', {
      params: {
        language: 'pt-BR',
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar filmes populares', error);
    throw error;
  }
};

export const fetchUpcomingMovies = async (page = 1) => {
  try {
    const response = await api.get('/movie/upcoming', {
      params: {
        language: 'pt-BR',
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar filmes em cartaz', error);
    throw error;
  }
};

export const fetchTopRatedMovies = async (page = 1) => {
  try {
    const response = await api.get('/movie/top_rated', {
      params: {
        language: 'pt-BR',
        page,
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
