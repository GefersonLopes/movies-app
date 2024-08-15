import { useEffect } from 'react';
import { useCelebrityStore } from '../store/celebrityStore';
import { useMovieStore } from '../store/movieStore';
import { Section } from './Section';
import { usePaginationStore } from '../store/paginationStore';

export const SectionsList = () => {
  const { fetchMovies, topRatedMovies, upComingMovies } = useMovieStore();
  const { celebrities, fetchCelebrities } = useCelebrityStore();
  const { topRatedMoviesPage, upComingMoviesPage, celebrityPage } =
    usePaginationStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies, topRatedMoviesPage, upComingMoviesPage]);

  useEffect(() => {
    fetchCelebrities();
  }, [fetchCelebrities, celebrityPage]);

  return (
    <>
      <Section title="Mais Populares" list={topRatedMovies} />
      <Section title="Melhores Filmes" list={upComingMovies} />
      <Section title="Celebridades" list={celebrities} />
    </>
  );
};
