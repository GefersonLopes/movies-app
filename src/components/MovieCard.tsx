import styled from 'styled-components';

export const Card = styled.div`
  background-color: ${(props) => props.theme.colors.cardBackground};
  border-radius: ${(props) => props.theme.spacing(1)};
  overflow: hidden;
  position: relative;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;

export const MovieImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 70%;
`;

export const MovieInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: ${(props) => props.theme.spacing(2)};
  color: ${(props) => props.theme.colors.text};
`;

interface MovieTitleProps {
  hasOverview?: boolean;
}

export const MovieTitle = styled.h3<MovieTitleProps>`
  margin: 0;
  font-size: ${(props) => (props.hasOverview ? '1rem' : '0.75rem')};
  color: ${(props) => props.theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  width: 100%;
`;

export const MovieOverview = styled.p`
  font-size: 0.7rem;
  color: #b4b4b4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  max-width: 550px;
`;

export const MovieScore = styled.div`
  position: absolute;
  top: ${(props) => props.theme.spacing(1)};
  left: ${(props) => props.theme.spacing(1)};
  background-color: ${(props) => props.theme.colors.button};
  color: ${(props) => props.theme.colors.text};
  padding: ${(props) => props.theme.spacing(0.5)};
  border-radius: ${(props) => props.theme.spacing(1)};
  font-weight: bold;
  display: flex;
  align-items: center;
  backdrop-filter: blur(3px);
`;

export const StarIcon = styled.span`
  margin-right: ${(props) => props.theme.spacing(0.5)};
  color: #ffcc00;
`;

export const WatchTrailerButton = styled.button`
  background-color: ${(props) => props.theme.colors.button};
  border: 1px solid transparent;
  padding: ${(props) => props.theme.spacing(1)};
  border-radius: ${(props) => props.theme.spacing(1)};
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 0.7rem;
  margin-top: ${(props) => props.theme.spacing(1)};
  cursor: pointer;
  width: 130px;
  text-align: center;
  backdrop-filter: blur(3px);

  &:hover {
    border: 1px solid ${(props) => props.theme.colors.button};
  }
`;

export interface MovieCardProps {
  id?: number;
  title: string;
  overview?: string;
  imageUrl: string;
  score: number;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  title,
  imageUrl,
  overview,
  score,
}) => (
  <Card>
    <MovieImage src={imageUrl} alt={title} />
    <MovieScore>
      <StarIcon>⭐</StarIcon> {score.toFixed(1)}
    </MovieScore>
    <MovieInfo>
      <MovieTitle hasOverview={!!overview}>{title}</MovieTitle>
      {overview && <MovieOverview>{overview}</MovieOverview>}
      <WatchTrailerButton>Assistir ao trailer ▶</WatchTrailerButton>
    </MovieInfo>
  </Card>
);
