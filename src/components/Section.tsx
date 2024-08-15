import styled from 'styled-components';
import { useRef } from 'react';
import { CelebrityProps } from '../store/celebrityStore';
import { Movie } from '../store/movieStore';
import { MovieCard } from './MovieCard';
import { CelebrityCard } from './CelebritiesCard';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { usePaginationStore } from '../store/paginationStore';

export const SectionContainer = styled.section`
  margin: 0 ${(props) => props.theme.spacing(2)};
  position: relative;
`;

export const SectionTitle = styled.h3`
  position: relative;
  margin-bottom: ${(props) => props.theme.spacing(2)};
  color: ${(props) => props.theme.colors.text};
  font-size: 1rem;
  font-weight: 600;
  padding-left: ${(props) => props.theme.spacing(1.5)};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background-color: ${(props) => props.theme.colors.text};
    border-radius: 2px;
  }
`;

const MoviesGrid = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(1)};
  overflow-x: auto;
  padding-bottom: ${(props) => props.theme.spacing(2)};
  flex-direction: row;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  .movie,
  .celebrity {
    width: 166.5px;
    height: 284px;
    flex: 0 0 auto;

    img {
      opacity: 40%;
    }
  }

  .celebrity {
    height: 200px;

    img {
      opacity: 90%;
    }
  }

  @media (min-width: 768px) {
    width: 100%;
    height: 100%;
    overflow-x: hidden;

    .movie {
      width: 339px;
      height: 253.67px;
    }

    .celebrity {
      width: 268.8px;
      height: 253.67px;
    }
  }
`;

const NavigationButton = styled.button`
  display: none;

  @media (min-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
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
  }
`;

interface SectionProps {
  title?: string;
  list?: Movie[] | CelebrityProps[];
}

export const Section: React.FC<SectionProps> = ({ title, list }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    previousTopRatedMoviesPage,
    nextTopRatedMoviesPage,
    previousUpComingMoviesPage,
    nextUpComingMoviesPage,
    previousCelebrityPage,
    nextCelebrityPage,
  } = usePaginationStore();

  const scrollLeft = () => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;

      if (scrollLeft <= 0) {
        if (title === 'Mais Populares') {
          previousTopRatedMoviesPage();
        } else if (title === 'Melhores Filmes') {
          previousUpComingMoviesPage();
        } else if (title === 'Celebridades') {
          previousCelebrityPage();
        }
        return;
      }

      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      if (scrollLeft + clientWidth >= scrollWidth) {
        if (title === 'Mais Populares') {
          nextTopRatedMoviesPage();
        } else if (title === 'Melhores Filmes') {
          nextUpComingMoviesPage();
        } else if (title === 'Celebridades') {
          nextCelebrityPage();
        }
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        return;
      }

      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <SectionContainer className={title}>
      {title && <SectionTitle>{title}</SectionTitle>}
      <NavigationButton className="left" onClick={scrollLeft}>
        <MdArrowBackIos size={20} />
      </NavigationButton>
      <NavigationButton className="right" onClick={scrollRight}>
        <MdArrowForwardIos size={20} />
      </NavigationButton>
      <MoviesGrid ref={scrollRef}>
        {list?.map((item) => {
          return 'name' in item ? (
            <CelebrityCard key={item.id} {...(item as CelebrityProps)} />
          ) : (
            <MovieCard key={item.id} {...(item as Movie)} />
          );
        })}
      </MoviesGrid>
    </SectionContainer>
  );
};
