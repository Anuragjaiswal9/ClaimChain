import React, { useState } from 'react';

function Login({ onLogin }) {
  const [inputUsername, setInputUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputUsername.trim()) {
      console.log(inputUsername);
      onLogin(inputUsername); // Trigger login with the entered username
    } else {
      alert("Please enter a username.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your username"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          style={{ padding: "8px", fontSize: "16px" }}
        />
        <button type="submit" style={{ marginLeft: "10px", padding: "8px 16px", fontSize: "16px" }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
