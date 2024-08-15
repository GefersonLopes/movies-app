import { api } from './api';

export const fetchPopularCelebrities = async (page = 1) => {
  try {
    const response = await api.get('/person/popular', {
      params: {
        language: 'pt-BR',
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar celebridade', error);
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
    console.error('Erro ao buscar detalhes da celebridade', error);
    throw error;
  }
};

export const fetchCelebrityCombinedCredit = async (celebrityId: number) => {
  try {
    const response = await api.get(`/person/${celebrityId}/combined_credits`, {
      params: {
        language: 'pt-BR',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar detalhes da celebridade', error);
    throw error;
  }
};
