import styled from 'styled-components';

export const SectionContainer = styled.section`
  margin: 0 ${(props) => props.theme.spacing(2)};
`;

const SectionTitle = styled.h3`
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
  gap: ${(props) => props.theme.spacing(2)};
  overflow-x: auto;
  padding-bottom: ${(props) => props.theme.spacing(2)};

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

interface SectionProps {
  title?: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, children }) => (
  <SectionContainer>
    {title && <SectionTitle>{title}</SectionTitle>}
    <MoviesGrid>{children}</MoviesGrid>
  </SectionContainer>
);
