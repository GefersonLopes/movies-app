import styled from 'styled-components';
import { Card, MovieImage, MovieInfo, MovieTitle } from './MovieCard';
import { fetchCelebrityDetails } from '../services/celebrityService';
import { useEffect, useState } from 'react';
import { getAge } from '../utils/calculateAge';
import { CelebrityProps } from '../store/celebrityStore';

const CelebrityAge = styled.span`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 0.7rem;
  font-weight: 100;
  margin-left: ${(props) => props.theme.spacing(0.5)};
`;

export const CelebrityCard: React.FC<CelebrityProps> = (celebrity) => {
  const [age, setAge] = useState<number>(0);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchCelebrityDetails(+celebrity.id);
        const calculateAge = getAge(details.biography);
        setAge(calculateAge);
      } catch (error) {
        console.error('Erro ao buscar detalhes da celebridade', error);
      }
    };

    fetchDetails();
  }, [celebrity.id]);

  return (
    <Card className="celebrity">
      <MovieImage
        src={`https://image.tmdb.org/t/p/w500/${celebrity.profile_path}`}
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
