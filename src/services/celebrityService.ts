import { api } from './api';

export const fetchPopularCelebrities = async () => {
  try {
    const response = await api.get('/person/popular', {
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

export const fetchCelebrityDetails = async (celebrityId: number) => {
  try {
    const response = await api.get(`/person/${celebrityId}`, {
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
