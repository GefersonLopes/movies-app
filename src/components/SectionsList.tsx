import { useEffect } from 'react';
import { useCelebrityStore } from '../store/celebrityStore';
import { useMovieStore } from '../store/movieStore';
import { Section } from './Section';

export const SectionsList = () => {
  const { fetchMovies, topRatedMovies, upComingMovies } = useMovieStore();
  const { celebrities, fetchCelebrities } = useCelebrityStore();

  useEffect(() => {
    fetchMovies();
    fetchCelebrities();
  }, [fetchCelebrities, fetchMovies]);

  return (
    <>
      <Section title="Mais Populares" list={topRatedMovies} />
      <Section title="Melhores Filmes" list={upComingMovies} />
      <Section title="Celebridades" list={celebrities} />
    </>
  );
};
