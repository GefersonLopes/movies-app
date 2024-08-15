import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCelebrityDetails } from '../services/celebrityService';
import { CelebrityProps } from '../store/celebrityStore';
import { coverteDate, getAge } from '../utils/calculateAge';

const CelebrityCardContainer = styled.div`
  padding: ${(props) => props.theme.spacing(2)};
  border-radius: 10px;
  width: 100%;

  @media (min-width: 768px) {
    width: 25%;
  }
`;

const CelebrityImage = styled.img`
  width: 100%;
  height: 343px;
  border-radius: 10px;
  margin-bottom: ${(props) => props.theme.spacing(2)};
  border: 3px solid #3a3a3a;
`;

const CelebrityName = styled.h2`
  font-size: 1.25rem;
  margin-bottom: ${(props) => props.theme.spacing(1)};
`;

const CelebrityDetail = styled.p`
  font-size: 0.875rem;
  margin: ${(props) => props.theme.spacing(1)} 0;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  color: #b4b4b4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BoldText = styled.span`
  color: ${(props) => props.theme.colors.text};
`;

const CelebrityProfile: React.FC = () => {
  const { id } = useParams();
  const [celebrity, setCelebrity] = useState<CelebrityProps>(
    {} as CelebrityProps,
  );

  useEffect(() => {
    const fetchCelebrity = async () => {
      try {
        const celebrity = await fetchCelebrityDetails(+id!);
        setCelebrity(celebrity);
      } catch (error) {
        console.error('Erro ao buscar detalhes da celebridade', error);
      }
    };

    if (id) fetchCelebrity();
  }, [id]);

  const age = getAge(celebrity.birthday);

  return (
    <CelebrityCardContainer>
      <CelebrityImage
        src={`https://image.tmdb.org/t/p/w500/${celebrity.profile_path}`}
        alt="Zendaya Coleman"
      />
      <CelebrityName>Zendaya Coleman</CelebrityName>
      <CelebrityDetail>
        <BoldText>Nascido(a) em:</BoldText>
        {coverteDate(celebrity.birthday)} ({age} anos){' '}
      </CelebrityDetail>
      <CelebrityDetail>
        <BoldText>Origem:</BoldText> {celebrity.place_of_birth}
      </CelebrityDetail>
      <CelebrityDetail>
        <BoldText>Sobre:</BoldText> {celebrity.biography}
      </CelebrityDetail>
    </CelebrityCardContainer>
  );
};

export default CelebrityProfile;
