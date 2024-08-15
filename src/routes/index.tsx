import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CelebrityPage from '../pages/CelebrityPage';
import { Home } from '../pages/Home';

const Routers: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/celebrity/:id" element={<CelebrityPage />} />
    </Routes>
  </Router>
);

export default Routers;
