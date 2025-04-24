import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  signup: (userData) => api.post('/auth/register', userData),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// User API calls
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
};

// Match API calls
export const matchAPI = {
  getMatchSummary: (team1, team2, year) => api.get(`/matches/summary?team1=${team1}&team2=${team2}&year=${year}`),
  getLiveCommentary: (matchId) => api.get(`/matches/${matchId}/commentary`),
};

// Team API calls
export const teamAPI = {
  getTeamReport: (teamName) => api.get(`/teams/${teamName}/report`),
  getTeamStats: (teamName) => api.get(`/teams/${teamName}/stats`),
};

// Player API calls
export const playerAPI = {
  getPlayerReport: (playerName) => api.get(`/players/${playerName}/report`),
  getPlayerStats: (playerName) => api.get(`/players/${playerName}/stats`),
};

// Stats API calls
export const statsAPI = {
  getBattingStats: () => api.get('/stats/batting'),
  getBowlingStats: () => api.get('/stats/bowling'),
  getFieldingStats: () => api.get('/stats/fielding'),
  getTeamRecords: () => api.get('/stats/team-records'),
};

export default api; 