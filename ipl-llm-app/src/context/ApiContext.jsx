import React, { createContext, useContext, useState } from 'react';
import { cricketApi, authApi } from '../services/apiService';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleApiCall = async (apiCall, ...args) => {
        setLoading(true);
        setError(null);
        try {
            const result = await apiCall(...args);
            return result;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        loading,
        error,
        cricket: {
            chat: (message) => handleApiCall(cricketApi.chat, message),
            getMatchSummary: (details) => handleApiCall(cricketApi.getMatchSummary, details),
            getPlayerReport: (details) => handleApiCall(cricketApi.getPlayerReport, details),
            getTeamReport: (details) => handleApiCall(cricketApi.getTeamReport, details),
            getCommentary: (details) => handleApiCall(cricketApi.getCommentary, details),
        },
        auth: {
            login: (credentials) => handleApiCall(authApi.login, credentials),
            register: (userData) => handleApiCall(authApi.register, userData),
            logout: authApi.logout,
        },
    };

    return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error('useApi must be used within an ApiProvider');
    }
    return context;
}; 