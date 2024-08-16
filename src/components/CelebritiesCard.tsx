import styled from 'styled-components';
import { Card, MovieImage, MovieInfo, MovieTitle } from './MovieCard';
import { fetchCelebrityDetails } from '../services/celebrityService';
import { useEffect, useState } from 'react';
import { getAge } from '../utils/calculateAge';
import { CelebrityProps } from '../store/celebrityStore';
import { useNavigate } from 'react-router-dom';

const defaultPoster =
  'https://via.placeholder.com/500x750.png?text=No+Image+Available';

const CelebrityAge = styled.span`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 0.7rem;
  font-weight: 100;
  margin-left: ${(props) => props.theme.spacing(0.5)};
`;

export const CelebrityCard: React.FC<CelebrityProps> = (celebrity) => {
  const [age, setAge] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchCelebrityDetails(+celebrity.id);
        const calculateAge = getAge(details.birthday);
        setAge(calculateAge);
      } catch (error) {
        console.error('Erro ao buscar detalhes da celebridade', error);
      }
    };

    fetchDetails();
  }, [celebrity.id]);

  return (
    <Card
      className="celebrity"
      onClick={() => navigate(`/celebrity/${celebrity.id}`)}
    >
      <MovieImage
        src={
          celebrity.profile_path
            ? `https://image.tmdb.org/t/p/w500/${celebrity.profile_path}`
            : defaultPoster
        }
        alt={celebrity.name}
      />
      <MovieInfo>
        <MovieTitle>
          {celebrity.name}
          <CelebrityAge>{age === 0 ? 'N/A' : age}</CelebrityAge>
        </MovieTitle>
      </MovieInfo>
    </Card>
  );
};
