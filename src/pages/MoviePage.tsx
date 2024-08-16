import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  Card,
  MovieImage,
  MovieInfo,
  WatchTrailerButton,
} from '../components/MovieCard';
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchMovieSimilar,
} from '../services/movieService';
import { CelebrityProps } from '../store/celebrityStore';
import { Section, SectionTitle } from '../components/Section';
import { MovieDetails } from '../components/MoviePrincipalCard';

const SectionContainer = styled.div`
  width: 100%;
  padding: ${(props) => props.theme.spacing(2)};
  max-height: 200px;
  height: 20rem;

  @media (min-width: 768px) {
    height: 30rem;
    max-height: 476px;
  }
`;

const MovieDetailsContainer = styled.div`
  color: ${(props) => props.theme.colors.text};
  padding: ${(props) => props.theme.spacing(2)};
  background-color: ${(props) => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(2)};
  max-width: 800px;
  margin: auto;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const MovieTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
`;

const RatingAndInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  font-size: 1rem;
`;

const Rating = styled.span`
  color: yellow;
`;

const MovieInfoText = styled.span`
  font-size: 0.9rem;
  color: #ccc;
`;

const Synopsis = styled.p`
  font-size: 1rem;
  line-height: 1.5;
`;

const TagsContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(1)};
  padding: 0 ${(props) => props.theme.spacing(2)};
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background-color: transparent;
  border: 1px solid #333;
  padding: 0 ${(props) => props.theme.spacing(1)};
  border-radius: 16px;
  font-size: 0.8rem;
`;

const CreditsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(1)};
  font-size: 0.9rem;

  @media (min-width: 768px) {
    align-items: flex-start;
  }
`;

const CreditItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(0.5)};
  align-items: flex-start;

  @media (min-width: 768px) {
    align-items: flex-start;
  }
`;

const CreditNames = styled.p`
  margin: 0;
  color: #ccc;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #1c1c1c;
  color: #fff;
`;

const LeftSection = styled.div`
  width: 100%;
  padding: 0 ${(props) => props.theme.spacing(2)};

  @media (min-width: 768px) {
    width: 60%;
  }
`;

const RightSection = styled.div`
  width: 100%;
  padding: 0 ${(props) => props.theme.spacing(2)};
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    width: 40%;
  }
`;

const Division = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const MoviePage: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails>({} as MovieDetails);
  const [similar, setSimilar] = useState<CelebrityProps[]>([]);
  const [credits, setCredits] = useState<any[]>([]);

  const defaultPoster =
    'https://via.placeholder.com/500x750.png?text=No+Image+Available';

  useEffect(() => {
    const fetchMovie = async () => {
      const movie = await fetchMovieDetails(Number(id));
      const similar = await fetchMovieSimilar(Number(id));
      const { crew, cast } = await fetchMovieCredits(Number(id));
      const combinedMovies = [...crew, ...cast];
      const credits = Array.from(
        new Map(combinedMovies.map((movie) => [movie.id, movie])).values(),
      );
      console.log(credits);

      setMovie(movie);
      setSimilar(similar);
      setCredits(credits);
    };
    fetchMovie();
  }, [id]);

  return (
    <MainContainer>
      <SectionContainer>
        <Card className="movie">
          <MovieImage
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : defaultPoster
            }
            alt={movie.title}
          />
          <MovieInfo>
            <WatchTrailerButton>Assistir ao trailer ▶</WatchTrailerButton>
          </MovieInfo>
        </Card>
      </SectionContainer>
      <TagsContainer>
        {movie.genres?.map((genre) => <Tag key={genre.id}>{genre.name}</Tag>)}
      </TagsContainer>
      <Division>
        <LeftSection>
          <MovieTitle>{movie.title}</MovieTitle>
          <RatingAndInfo>
            <Rating>⭐ {movie.vote_average?.toFixed(1)}</Rating>
            <MovieInfoText>{movie.runtime} min</MovieInfoText>
            <MovieInfoText>{movie.release_date?.split('-')[0]}</MovieInfoText>
          </RatingAndInfo>
          <Synopsis>{movie.overview}</Synopsis>
        </LeftSection>
        <RightSection>
          <CreditsContainer>
            <CreditItem>
              <SectionTitle>Direção</SectionTitle>
              <CreditNames>
                {credits
                  .filter((credit) => credit.job === 'Director')
                  .slice(0, 3)
                  .map((credit) => credit.name)
                  .join(', ')}
              </CreditNames>
            </CreditItem>
            <CreditItem>
              <SectionTitle>Roteiristas</SectionTitle>
              <CreditNames>
                {credits
                  .filter((credit) => credit.job === 'Screenplay')
                  .slice(0, 3)
                  .map((credit) => credit.name)
                  .join(', ')}
              </CreditNames>
            </CreditItem>
            <CreditItem>
              <SectionTitle>Artistas</SectionTitle>
              <CreditNames>
                {credits
                  .filter((credit) => credit.known_for_department === 'Acting')
                  .slice(0, 3)
                  .map((credit) => credit.name)
                  .join(', ')}
              </CreditNames>
            </CreditItem>
          </CreditsContainer>
        </RightSection>
      </Division>
      <Section title="Elenco principal" list={credits} />
      <Section title="Semelhantes" list={similar} />
    </MainContainer>
  );
};

export default MoviePage;
