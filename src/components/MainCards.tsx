import styled from 'styled-components';
import { useMovieStore } from '../store/movieStore';
import { useEffect } from 'react';
import { MovieCard } from './MovieCard';
import { MoviePrincipalCard } from './MoviePrincipalCard';
import { SectionTitle } from './Section';

export const MainCardContainer = styled.main`
  width: 100%;
  padding: ${(props) => props.theme.spacing(1)};

  & > div:first-child {
    width: 100%;
    height: 284px;

    img {
      opacity: 83%;
    }
  }

  & > div:last-child > section {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    gap: ${(props) => props.theme.spacing(1)};

    &::-webkit-scrollbar {
      display: none;
    }

    .movie {
      width: 166.5px;
      height: 284px;
      flex: 0 0 auto;

      img {
        opacity: 40%;
      }
    }
  }

  @media (min-width: 768px) {
    height: calc(3 * 200px + 60px);
    display: flex;
    gap: ${(props) => props.theme.spacing(1)};

    & > div:first-child {
      width: calc(max(70%, 100% - 380px));
      min-width: 300px;
      height: 100%;
    }

    h3 {
      margin: 0;
    }

    & > div:last-child {
      width: 28%;
    }

    & > div:last-child > section {
      width: 100%;
      flex-direction: column;
      max-width: 380px;
      height: 100%;
      overflow: hidden;

      .movie {
        width: 100%;
        height: 100%;
        max-height: 200px;
      }

      & > :nth-child(n + 5) {
        display: none;
      }
    }
  }
`;

export const MainPopularCards = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(1)};
`;

export const MainCard = () => {
  const { principalMovie, popularMovies, fetchMovies } = useMovieStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <MainCardContainer>
      <MoviePrincipalCard {...principalMovie} />
      <MainPopularCards>
        <SectionTitle>Destaques também</SectionTitle>
        <section>
          {popularMovies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </section>
      </MainPopularCards>
    </MainCardContainer>
  );
};
