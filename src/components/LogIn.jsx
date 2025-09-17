import React, { useState } from "react";
import Button from "./Button";

function LogIn({ login, onCancel, loginError, clearError, resetToHome }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const performLogin = (evt) => {
    evt.preventDefault();
    login(credentials.username, credentials.password);
  };

  const onChange = (evt) => {
    const { id, value } = evt.target;
    setCredentials({ ...credentials, [id]: value });
    if (loginError) {
      clearError(); // Clear error when the user starts typing
    }
  };

  return (
    <div className="login-form">
      <img
        src="baeTechTransparentRedSmall.png"
        alt="baeTech Logo"
        onClick={resetToHome}
        style={{ cursor: 'pointer' }}
        title="Klik for at gå til forsiden"
      />
      <h2>Velkommen tilbage</h2>
      
      {loginError && (
        <div className="login-error">
          {loginError}
        </div>
      )}
      
      <form onSubmit={performLogin}>
        <input
          id="username"
          placeholder="Brugernavn"
          value={credentials.username}
          onChange={onChange}
          required
        />
        <input
          id="password"
          type="password"
          placeholder="Kodeord"
          value={credentials.password}
          onChange={onChange}
          required
        />
        <Button type="submit" variant="submit">
          Log på
        </Button>
        <Button type="button" variant="secondary" className="cancel-button" onClick={onCancel}>
          Tilbage til forside
        </Button>
      </form>
    </div>
  );
}

export default LogIn;
