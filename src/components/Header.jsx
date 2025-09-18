import React from 'react';
import ThemeToggle from './ThemeToggle';
import Button from './Button';
import { LoginIcon, LogoutIcon } from './Icons';

/**
 * Header component with logo, authentication controls, and theme toggle
 */
const Header = ({ loggedIn, onLogin, onLogout, onResetToHome }) => {
  return (
    <div className="app-header">
      <img
        src="mk2.png"
        alt="MK2 Icon"
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
