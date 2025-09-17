import { useState } from 'react';
import facade from '../utils/apiFacade';
import { ERROR_MESSAGES } from '../utils/constants';

/**
 * Custom hook for managing authentication state and operations
 */
export const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginError, setLoginError] = useState('');

  const login = async (username, password) => {
    try {
      await facade.login(username, password);
      setLoggedIn(true);
      setShowLogin(false);
      setLoginError('');
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError(ERROR_MESSAGES.LOGIN_FAILED);
      throw error;
    }
  };

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
    setShowLogin(false);
    setLoginError('');
  };

  const openLogin = () => {
    setShowLogin(true);
    setLoginError('');
  };

  const closeLogin = () => {
    setShowLogin(false);
    setLoginError('');
  };

  const clearError = () => {
    setLoginError('');
  };

  return {
    loggedIn,
    showLogin,
    loginError,
    login,
    logout,
    openLogin,
    closeLogin,
    clearError
  };
};
