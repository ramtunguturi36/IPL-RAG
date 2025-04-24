import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Cricket API endpoints
export const cricketApi = {
    // Chat
    chat: async (message) => {
        try {
            const response = await api.post('/cricket/chat', { message });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Match Summary
    getMatchSummary: async (matchDetails) => {
        try {
            const response = await api.post('/cricket/match-summary', matchDetails);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Player Report
    getPlayerReport: async (playerDetails) => {
        try {
            const response = await api.post('/cricket/player-report', playerDetails);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Team Report
    getTeamReport: async (teamDetails) => {
        try {
            const response = await api.post('/cricket/team-report', teamDetails);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Commentary
    getCommentary: async (matchDetails) => {
        try {
            const response = await api.post('/cricket/commentary', matchDetails);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

// Auth API endpoints
export const authApi = {
    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    register: async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
    }
}; 