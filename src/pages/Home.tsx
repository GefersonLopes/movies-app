import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MainCard } from '../components/MainCards';
import { SectionsList } from '../components/SectionsList';

export const Home = () => {
  return (
    <>
      <Header />
      <MainCard />
      <SectionsList />
      <Footer />
    </>
  );
};
