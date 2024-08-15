import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { SectionTitle } from './Section';
import { useParams } from 'react-router-dom';
import { fetchCelebrityCombinedCredit } from '../services/celebrityService';
import { MovieDetails } from './MoviePrincipalCard';
import { StarIcon } from './MovieCard';
import { convertYear } from '../utils/calculateAge';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

const defaultPoster =
  'https://via.placeholder.com/500x750.png?text=No+Image+Available';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.spacing(1)};
  width: 100%;
  position: relative;

  @media (min-width: 768px) {
    width: 75%;
    height: 100%;
  }
`;

const MovieListContainer = styled.div<{ itemsCount: number | undefined }>`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => Math.ceil((props.itemsCount || 0) / 3)},
    1fr
  );
  grid-template-rows: repeat(3, 1fr);
  gap: ${(props) => props.theme.spacing(6)};
  overflow-x: auto;
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing(2)};
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(
      ${(props) => Math.ceil((props.itemsCount || 0) / 5)},
      1fr
    );
    grid-template-rows: repeat(5, 1fr);
    height: 100%;
    margin-bottom: ${(props) => props.theme.spacing(5)};
    overflow-x: hidden;
  }
`;

const NavigationButton = styled.button`
  display: none;

  @media (min-width: 768px) {
    display: block;
    position: absolute;
    bottom: 0;
    background-color: transparent;
    border: none;
    color: white;
    cursor: pointer;
    z-index: 2;

    &:hover {
      color: ${(props) => props.theme.colors.primary};
    }

    &.left {
      right: 3rem;
    }

    &.right {
      right: 0;
    }

    &.page {
      right: 6rem;
      bottom: 6px;
    }
  }
`;

const MovieItem = styled.div`
  display: flex;
  height: 94px;
  width: 318.67px;
  text-align: center;
  color: white;
`;

const MoviePoster = styled.img`
  width: 64px;
  height: 100%;
  border-radius: 8px;
  margin-bottom: ${(props) => props.theme.spacing(1)};
`;

const MovieTitle = styled.h4`
  font-size: 0.8rem;
  margin-bottom: ${(props) => props.theme.spacing(0.5)};
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: start;
`;

const MovieInfo = styled.p`
  font-size: 0.875rem;
  color: #b4b4b4;
  margin: 0;
`;

const MovieYear = styled.span`
  font-size: 0.875rem;
  color: #b4b4b4;
`;

const MovieDetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: ${(props) => props.theme.spacing(1)};
`;

const MovieRating = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const CelebrityMovies: React.FC = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState<MovieDetails[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCelebrity = async () => {
      try {
        const { crew, cast } = await fetchCelebrityCombinedCredit(+id!);
        const combinedMovies = [...crew, ...cast];
        const uniqueMovies = Array.from(
          new Map(combinedMovies.map((movie) => [movie.id, movie])).values(),
        );
        setMovies(uniqueMovies);
      } catch (error) {
        console.error('Erro ao buscar detalhes da celebridade', error);
      }
    };

    if (id) fetchCelebrity();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, clientWidth } = scrollRef.current;
        const page = Math.round(scrollLeft / clientWidth);
        setCurrentPage(page);
      }
    };

    const calculateTotalPages = () => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth } = scrollRef.current;
        const total = Math.ceil(scrollWidth / clientWidth);
        setTotalPages(total);
      }
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      calculateTotalPages();
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [movies]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <Section>
      <SectionTitle>Filmes e séries</SectionTitle>
      <NavigationButton className="left" onClick={scrollLeft}>
        <MdArrowBackIos size={20} />
      </NavigationButton>
      <NavigationButton className="page">
        Página atual: {currentPage + 1} de {totalPages}
      </NavigationButton>
      <NavigationButton className="right" onClick={scrollRight}>
        <MdArrowForwardIos size={20} />
      </NavigationButton>
      <MovieListContainer itemsCount={movies?.length} ref={scrollRef}>
        {movies?.map((movie: any, index: any) => (
          <MovieItem key={index}>
            <MoviePoster
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : defaultPoster
              }
              alt={movie.title}
            />
            <MovieDetailsDiv>
              <MovieTitle>{movie.title}</MovieTitle>
              <MovieRating>
                <StarIcon>⭐</StarIcon> {movie.vote_average?.toFixed(1) || 0}
              </MovieRating>
              <MovieInfo>{movie.character || movie.job}</MovieInfo>
              <MovieYear>{convertYear(movie.release_date)}</MovieYear>
            </MovieDetailsDiv>
          </MovieItem>
        ))}
      </MovieListContainer>
    </Section>
  );
};

export default CelebrityMovies;
