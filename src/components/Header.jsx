import React from 'react';
import ThemeToggle from './ThemeToggle';
import Button from './Button';
import { LoginIcon, LogoutIcon } from './Icons';
import { useTheme } from '../context/ThemeContext';

/**
 * Header component with logo, authentication controls, and theme toggle
 */
const Header = ({ loggedIn, onLogin, onLogout, onResetToHome }) => {
  const { isDark } = useTheme();
  
  return (
    <div className="app-header">
      <img
        src={isDark ? "mk3-transparent.png" : "mk-transparent.png"}
        alt="MK Logo"
        className="header-icon-left"
      />
      <div className="header-controls">
        <div className="auth-button">
          {!loggedIn ? (
            <Button
              variant="login"
              onClick={onLogin}
              icon={LoginIcon}
            >
              Log ind
            </Button>
          ) : (
            <Button
              variant="logout"
              onClick={onLogout}
              icon={LogoutIcon}
            >
              Log ud
            </Button>
          )}
        </div>
        <ThemeToggle />
      </div>
      <img
        src="baeTechTransparentRedSmall.png"
        alt="baeTech Logo"
        onClick={onResetToHome}
        style={{ cursor: 'pointer' }}
        title="Klik for at gå til forsiden"
      />
    </div>
  );
};

export default Header;
