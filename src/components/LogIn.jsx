import React, { useState } from "react";

function LogIn({ login, onCancel }) {
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const performLogin = (evt) => {
    evt.preventDefault();
    login(credentials.username, credentials.password);
  };

  const onChange = (evt) => {
    const { id, value } = evt.target;
    setCredentials({ ...credentials, [id]: value });
  };

  return (
    <div className="login-form">
       <img
  src="baetech.png"
  alt="Logo"
  style={{ width: "350px", height: "auto", display: "block", margin: "0 auto" }}
/>
      <h2>Log på</h2>
      <form onSubmit={performLogin}>
        <input
          id="username"
          placeholder="Brugernavn"
          value={credentials.username}
          onChange={onChange}
        />
        <input
          id="password"
          type="password"
          placeholder="Kodeord"
          value={credentials.password}
          onChange={onChange}
        />
        <button type="submit" className="login-submit-button">
          Log på
        </button>
        <button type="button" onClick={onCancel} className="cancel-button">
          Annuller
        </button>
      </form>
    </div>
  );
}

export default LogIn;
