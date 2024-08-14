import axios from 'axios';

const BEARER_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzVlMWUxYTM0ZTAzMTljMGIzNDk1OTIyZjRmNzNhNyIsIm5iZiI6MTcyMzU1NzM1My44NDc3ODEsInN1YiI6IjY2YmI2NGM2ZjM1MWQyMzQxMzNmMTJiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iCG2oXiAWopvj0FCYrPsoV4qeVYEj6VIilj1fdgALlk';

export const urlFetchImg = 'https://image.tmdb.org/t/p/w500';

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
});
