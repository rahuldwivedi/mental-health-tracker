import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import GoogleButton from 'react-google-button'
import Home from './Home';
import Dashboard from './Dashboard';
import api from '../axios';

function Login() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => handleUserLogin(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  const handleUserLogin = (user) => {
    if (user) {
        api
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            localStorage.setItem('userProfile', JSON.stringify(res.data));
            handleUserInfo(res.data);
          })
          .catch((err) => console.log(err));
    }
  };

  const handleUserInfo = (userData) => {
    api.post('/register', {
      googleId: userData.id,
      name: userData.name,
      email: userData.email
    })
    .then(response => {
      setProfile(response.data);
      localStorage.setItem('userProfile', JSON.stringify(response.data));
    })
    .catch(error => {
      console.log('Registration error:', error);
    });
  };

  const logOut = () => {
    googleLogout();
    setProfile(null);
    localStorage.removeItem('userProfile');
  };

  return (
      <div>
          {profile ? (
            <div>
              <Home profile={profile} logOut={logOut} />
              <Dashboard />
            </div>
          ) : (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '80vh' 
            }}>
              <GoogleButton onClick={() => login()}>Sign in with Google</GoogleButton>
            </div>
          )}
      </div>
  );
}

export default Login;
