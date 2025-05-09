import Layout from '@/components/Layout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import EventsPage from '@/pages/EventsPage';
import LoginPage from '@/pages/LoginPage';
import OddDetailPage from '@/pages/OddDetailPage';
import OddsPage from '@/pages/OddsPage';
import ScorePage from '@/pages/ScorePage';
import SportsPage from '@/pages/SportsPage';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<LoginPage />} />
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<SportsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:eventId" element={<EventsPage />} />
          <Route path="/sports" element={<SportsPage />} />
          <Route path="/sports/:sportKey/events" element={<EventsPage />} />
          <Route path="/sports/:sportKey/events/:eventId" element={<EventsPage />} />
          <Route path="/odds" element={<OddsPage />} />
          <Route path="/odds/:sportKey/:eventId" element={<OddDetailPage />} />
          <Route path="/scores" element={<ScorePage />} />
          {/* Add more protected routes here */}
        </Route>
      </Route>
      {/* Wildcard redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
