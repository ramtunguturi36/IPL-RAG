import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardHome from './pages/DashboardHome';
import ChatbotPage from './pages/ChatbotPage';
import MatchSummaryPage from './pages/MatchSummaryPage';
import TeamReportPage from './pages/TeamReportPage';
import PlayerReportPage from './pages/PlayerReportPage';
import CommentaryPage from './pages/CommentaryPage';
import StatsBoxPage from './pages/StatsBoxPage';
import FavoritesPage from './pages/FavoritesPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import ProfilePage from './pages/ProfilePage';
import { ApiProvider } from './context/ApiContext';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard/*"
        element={
          isAuthenticated ? (
            <MainLayout />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="chatbot" element={<ChatbotPage />} />
        <Route path="match-summary" element={<MatchSummaryPage />} />
        <Route path="team-report" element={<TeamReportPage />} />
        <Route path="player-report" element={<PlayerReportPage />} />
        <Route path="commentary" element={<CommentaryPage />} />
        <Route path="stats" element={<StatsBoxPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="help" element={<HelpPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <ApiProvider>
            <AppRoutes />
          </ApiProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
