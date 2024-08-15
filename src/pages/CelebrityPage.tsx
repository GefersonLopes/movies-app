import React from 'react';
import CelebrityProfile from '../components/CelebrityProfile';
import CelebrityMovies from '../components/CelebrityMovies';
import styled from 'styled-components';

const CelebrityPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row-reverse;
    align-items: flex-start;
  }
`;
const CelebrityPage: React.FC = () => {
  return (
    <CelebrityPageContainer>
      <CelebrityProfile />
      <CelebrityMovies />
    </CelebrityPageContainer>
  );
};

export default CelebrityPage;
