import styled from 'styled-components';
import { Card, MovieImage, MovieInfo, MovieTitle } from './MovieCard';
import { fetchCelebrityDetails } from '../services/celebrityService';
import { useEffect, useState } from 'react';
import { getAge } from '../utils/calculateAge';

export interface CelebrityCardProps {
  id: number;
  name: string;
  imageUrl: string;
}

const CelebrityAge = styled.span`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 0.7rem;
  font-weight: 100;
  margin-left: ${(props) => props.theme.spacing(0.5)};
`;

export const CelebrityCard: React.FC<CelebrityCardProps> = ({
  id,
  name,
  imageUrl,
}) => {
  const [age, setAge] = useState(0);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchCelebrityDetails(id);
        const calculateAge = getAge(details.biography);
        setAge(calculateAge);
      } catch (error) {
        console.error('Erro ao buscar detalhes do filme', error);
      }
    };

    fetchDetails();
  }, [id]);

  return (
    <Card>
      <MovieImage src={imageUrl} alt={name} />
      <MovieInfo>
        <MovieTitle>
          {name}
          <CelebrityAge>{age === 0 ? 'N/A' : age}</CelebrityAge>
        </MovieTitle>
      </MovieInfo>
    </Card>
  );
};
