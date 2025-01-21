import React, { useEffect } from 'react';

const GoogleLoginForm = () => {
  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000'}/auth/google`;
  };
  return (
    <div>
      <h1>Welcome to Mental Health Tracker</h1>
      <h2>Please Log in</h2>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default GoogleLoginForm;
