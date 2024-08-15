import styled from 'styled-components';
import { CelebrityProps } from '../store/celebrityStore';
import { Movie } from '../store/movieStore';
import { MovieCard } from './MovieCard';
import { CelebrityCard } from './CelebritiesCard';

export const SectionContainer = styled.section`
  margin: 0 ${(props) => props.theme.spacing(2)};
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

interface SectionProps {
  title?: string;
  list?: Movie[] | CelebrityProps[];
}

export const Section: React.FC<SectionProps> = ({ title, list }) => (
  <SectionContainer>
    {title && <SectionTitle>{title}</SectionTitle>}
    <MoviesGrid>
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
