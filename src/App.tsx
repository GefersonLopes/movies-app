import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import LoadingModal from './components/LoadingModal';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Routers from './routes';

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Header />
    <Routers />
    <LoadingModal />
    <Footer />
  </ThemeProvider>
);

export default App;
