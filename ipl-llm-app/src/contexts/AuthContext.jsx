import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      console.log('Login Response:', response.data);
      const { token, user } = response.data;
      
      const userData = {
        name: user.username,
        email: user.email,
        favoriteTeam: user.favoriteTeam
      };
      console.log('Storing user data:', userData);
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const signup = async (userData) => {
    try {
      const response = await authAPI.signup(userData);
      console.log('Signup Response:', response.data);
      const { token, user } = response.data;
      
      const newUserData = {
        name: userData.username,
        email: userData.email,
        favoriteTeam: userData.favoriteTeam
      };
      console.log('Storing user data:', newUserData);
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(newUserData));
      setUser(newUserData);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      console.log('Found stored user:', storedUser);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 