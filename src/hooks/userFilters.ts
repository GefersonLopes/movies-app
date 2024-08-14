import { useMovieStore } from '../store/movieStore';

export const useFilters = () => {
  const { popularMovies: movies } = useMovieStore();

  const filterByCategory = (category: string) => {
    return movies.filter((movie) =>
      movie.genres?.some(
        (genre) => genre.name.toLowerCase() === category.toLowerCase(),
      ),
    );
  };

  const filterByTitle = (title: string) => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(title.toLowerCase()),
    );
  };

  return { filterByCategory, filterByTitle };
};
