import axios from 'axios';
import { useLoadingStore } from '../store/loadingStore';

const BEARER_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzVlMWUxYTM0ZTAzMTljMGIzNDk1OTIyZjRmNzNhNyIsIm5iZiI6MTcyMzU1NzM1My44NDc3ODEsInN1YiI6IjY2YmI2NGM2ZjM1MWQyMzQxMzNmMTJiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iCG2oXiAWopvj0FCYrPsoV4qeVYEj6VIilj1fdgALlk';

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
});

const setLoading = useLoadingStore.getState().setShow;

api.interceptors.request.use(
  (config) => {
    setLoading(true);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    return response;
  },
  (error) => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    return Promise.reject(error);
  },
);
