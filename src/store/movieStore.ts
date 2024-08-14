import create from 'zustand';
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from '../services/movieService';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  genres?: Array<{ id: number; name: string }>;
  overview: string;
}

interface MovieStore {
  principalMovie: Movie;
  popularMovies: Movie[];
  upComingMovies: Movie[];
  topRatedMovies: Movie[];
  fetchMovies: () => Promise<void>;
  getMovieById: (id: number) => Movie | undefined;
}

export const useMovieStore = create<MovieStore>((set, get) => ({
  popularMovies: [],
  principalMovie: {} as Movie,
  upComingMovies: [],
  topRatedMovies: [],
  fetchMovies: async () => {
    try {
      const [principalMovie, ...popularMovies] = await fetchPopularMovies();

      const topRatedMovies = await fetchTopRatedMovies();
      const upComingMovies = await fetchUpcomingMovies();

      set({ principalMovie, popularMovies, topRatedMovies, upComingMovies });
    } catch (error) {
      console.error('Erro ao buscar filmes', error);
    }
  },
  getMovieById: (id: number) => {
    return get().popularMovies.find((movie) => movie.id === id);
  },
}));
