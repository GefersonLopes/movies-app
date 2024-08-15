import styled from 'styled-components';
import {
  Card,
  MovieScore,
  MovieImage,
  MovieInfo,
  MovieTitle,
  StarIcon,
  WatchTrailerButton,
} from './MovieCard';
import { Movie } from '../store/movieStore';
import { RiFireLine } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../services/movieService';

const defaultPoster =
  'https://via.placeholder.com/500x750.png?text=No+Image+Available';

const MovieOverview = styled.p`
  font-size: 0.7rem;
  color: #b4b4b4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  max-width: 550px;
`;

export const MoviePrincipalScore = styled(MovieScore)`
  left: ${(props) => props.theme.spacing(5.5)};

  @media (min-width: 768px) {
    display: none;
  }
`;

export const MovieFeatured = styled(MoviePrincipalScore)`
  left: ${(props) => props.theme.spacing(1)};
`;

export const MovieFeaturedSecundary = styled(MovieScore)`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    position: initial;
    width: fit-content;
    padding: 4px ${(props) => props.theme.spacing(0.8)};
    gap: ${(props) => props.theme.spacing(0.5)};
    align-items: center;
    font-size: 0.8rem;
    margin-bottom: ${(props) => props.theme.spacing(1.5)};
  }
`;

export const MovieDetails = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing(1)};
  }
`;

const MovieDetailsContainer = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing(1)};
    font-size: 0.9rem;
    color: #b4b4b4;
    font-weight: 500;
    margin-top: ${(props) => props.theme.spacing(1)};

    & > span:first-child {
      color: ${(props) => props.theme.colors.text};
    }
  }
`;

const MovieDuration = styled.span`
  &::before {
    content: '•';
    margin: 0 8px;
  }
`;

const MovieGenres = styled.span`
  &::before {
    content: '•';
    margin: 0 8px;
  }
`;

const MovieYear = styled.span`
  &::before {
    content: '•';
    margin: 0 8px;
  }
`;

export interface MovieDetails extends Movie {
  runtime: number;
  release_date: string;
  genres?: Array<{ id: number; name: string }>;
  production_companies?: Array<{ id: number; name: string }>;
  production_countries?: Array<{ id: number; name: string }>;
  spoken_languages?: Array<{ id: number; name: string }>;
  homepage?: string;
  status?: string;
  tagline?: string;
}

export const MoviePrincipalCard: React.FC<MovieDetails> = (movie) => {
  const [details, setDetails] = useState({} as MovieDetails);

  useEffect(() => {
    if (movie.id) {
      const fetchMovie = async () => await fetchMovieDetails(movie.id);
      fetchMovie().then((data) => setDetails(data));
    }
  }, [movie.id]);

  return (
    <Card>
      <MovieImage
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : defaultPoster
        }
        alt={movie.title}
      />
      <MoviePrincipalScore>
        <StarIcon>⭐</StarIcon> {movie.vote_average?.toFixed(1) || 0}
      </MoviePrincipalScore>
      <MovieFeatured>
        <RiFireLine size={21} title="Em destaque" />
      </MovieFeatured>
      <MovieInfo>
        <MovieFeaturedSecundary>
          <RiFireLine size={21} title="Em destaque" />
          Em destaque
        </MovieFeaturedSecundary>
        <MovieTitle>{movie.title}</MovieTitle>
        <MovieDetailsContainer>
          <span>⭐ {movie.vote_average?.toFixed(1)}</span>
          <MovieDuration>
            {Math.floor(details.runtime / 60)}h {details.runtime % 60}m
          </MovieDuration>
          <MovieGenres>
            {details.genres
              ?.map((genre: { id: number; name: string }) => genre.name)
              .join(', ')}
          </MovieGenres>
          <MovieYear>{new Date(details.release_date).getFullYear()}</MovieYear>
        </MovieDetailsContainer>
        <MovieDetails></MovieDetails>
        <MovieOverview>{movie.overview}</MovieOverview>
        <WatchTrailerButton>Assistir ao trailer ▶</WatchTrailerButton>
      </MovieInfo>
    </Card>
  );
};
