import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CelebrityPage from '../pages/CelebrityPage';
import { Home } from '../pages/Home';
import MoviePage from '../pages/MoviePage';

const Routers: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/celebrity/:id" element={<CelebrityPage />} />
      <Route path="/movie/:id" element={<MoviePage />} />
      <Route path="*" element={<Home />} />
    </Routes>
  </Router>
);

export default Routers;
