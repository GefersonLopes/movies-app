// src/App.tsx
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { Home } from './pages/Home';
import LoadingModal from './components/LoadingModal';

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Home />
    <LoadingModal />
  </ThemeProvider>
);

export default App;
