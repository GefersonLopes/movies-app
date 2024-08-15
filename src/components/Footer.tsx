import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: ${(props) => props.theme.spacing(2)};
  text-align: center;
  color: ${(props) => props.theme.colors.textSecondary};
`;

export const Footer: React.FC = () => (
  <FooterContainer>&copy; 2024 Rater. All rights reserved.</FooterContainer>
);
