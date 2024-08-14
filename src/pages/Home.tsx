import React, { useEffect } from 'react';
import { useMovieStore } from '../store/movieStore';
import { Header } from '../components/Header';
import { Section } from '../components/Section';
import { MovieCard } from '../components/MovieCard';
import { Footer } from '../components/Footer';
import { urlFetchImg } from '../services/api';
import styled from 'styled-components';
import { useCelebrityStore } from '../store/celebrityStore';
import { CelebrityCard } from '../components/CelebritiesCard';

const MoviesContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 15px;
  height: 284px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CelebrityContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 15px;
  height: 200px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MoviePrincipalContainer = styled.div`
  height: 284px;
`;

const MovieCardWrapper = styled.div`
  flex: 0 0 auto;
  width: 150px;
`;

interface MovieResponseProps {
  id: number;
  title: string;
  overview?: string;
  poster_path: string;
  vote_average: number;
}

export const Home = () => {
  const {
    principalMovie,
    popularMovies,
    topRatedMovies,
    upComingMovies,
    fetchMovies,
  } = useMovieStore();

  const { celebrities, fetchCelebrities } = useCelebrityStore();

  const propertiesDefaults = (movie: MovieResponseProps) => ({
    title: movie.title,
    imageUrl: `${urlFetchImg + movie.poster_path}`,
    score: movie.vote_average || 0,
  });

  const RenderSectionsMovie = ({ movieList, title }: any) => {
    return (
      <Section title={title}>
        <MoviesContainer>
          {movieList.map((movie: any) => (
            <MovieCardWrapper key={movie.id}>
              <MovieCard {...propertiesDefaults(movie)} />
            </MovieCardWrapper>
          ))}
        </MoviesContainer>
      </Section>
    );
  };

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    fetchCelebrities();
  }, [fetchCelebrities]);

  return (
    <>
      <Header />

      <Section>
        <MoviePrincipalContainer>
          <MovieCard
            {...propertiesDefaults(principalMovie)}
            overview={principalMovie.overview}
          />
        </MoviePrincipalContainer>
      </Section>

      <RenderSectionsMovie movieList={popularMovies} title="Destaques também" />
      <RenderSectionsMovie movieList={topRatedMovies} title="Mais votados" />
      <RenderSectionsMovie movieList={upComingMovies} title="Em breve" />

      <Section title="Celebridades">
        <CelebrityContainer>
          {celebrities.map((celebrity: any) => (
            <MovieCardWrapper key={celebrity.id}>
              <CelebrityCard
                id={celebrity.id}
                name={celebrity.name}
                imageUrl={urlFetchImg + celebrity.profile_path}
              />
            </MovieCardWrapper>
          ))}
        </CelebrityContainer>
      </Section>

      <Footer />
    </>
  );
};
