import create from 'zustand';

export interface Pagination {
  popularMoviesPage: number;
  upComingMoviesPage: number;
  topRatedMoviesPage: number;
  celebrityPage: number;
}

interface PaginationState extends Pagination {
  nextPopularMoviesPage: () => void;
  previousPopularMoviesPage: () => void;
  nextUpComingMoviesPage: () => void;
  previousUpComingMoviesPage: () => void;
  nextTopRatedMoviesPage: () => void;
  previousTopRatedMoviesPage: () => void;
  nextCelebrityPage: () => void;
  previousCelebrityPage: () => void;
}

export const usePaginationStore = create<PaginationState>((set) => ({
  popularMoviesPage: 1,
  upComingMoviesPage: 1,
  topRatedMoviesPage: 1,
  celebrityPage: 1,

  nextPopularMoviesPage: () =>
    set((state) => ({ popularMoviesPage: state.popularMoviesPage + 1 })),

  previousPopularMoviesPage: () =>
    set((state) => ({
      popularMoviesPage: Math.max(1, state.popularMoviesPage - 1),
    })),

  nextUpComingMoviesPage: () =>
    set((state) => ({ upComingMoviesPage: state.upComingMoviesPage + 1 })),

  previousUpComingMoviesPage: () =>
    set((state) => ({
      upComingMoviesPage: Math.max(1, state.upComingMoviesPage - 1),
    })),

  nextTopRatedMoviesPage: () =>
    set((state) => ({ topRatedMoviesPage: state.topRatedMoviesPage + 1 })),

  previousTopRatedMoviesPage: () =>
    set((state) => ({
      topRatedMoviesPage: Math.max(1, state.topRatedMoviesPage - 1),
    })),

  nextCelebrityPage: () =>
    set((state) => ({ celebrityPage: state.celebrityPage + 1 })),

  previousCelebrityPage: () =>
    set((state) => ({
      celebrityPage: Math.max(1, state.celebrityPage - 1),
    })),
}));
