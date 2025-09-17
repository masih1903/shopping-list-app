import React, { useState } from "react";

function LogIn({ login, onCancel, loginError, clearError }) {
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
        <button type="submit" className="login-submit-button">
          Log på
        </button>
        <button type="button" onClick={onCancel} className="cancel-button">
          Tilbage til forside
        </button>
      </form>
    </div>
  );
}

export default LogIn;
