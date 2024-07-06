// src/components/Authentication.js
import React, {useState} from 'react';
import axios from 'axios';
import './auth.css';

import Button from '../../components/general/Button';

import Login from './Login'
import Register from './Register'

const Authentication = ({ setIsLoggedIn, setUserUsername }) => {
  const [_switch, setSwitch] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const endpoint = _switch ? 'http://localhost:8000/api/auth/login' : 'http://localhost:8000/api/auth/register';
    try {
      console.log('Sending request to:', endpoint);
      const response = await axios.post(endpoint, { username, password });
      console.log('Response received:', response);
      const { token, username: responseUsername } = response.data;
      localStorage.setItem('accessToken', token);
      setUserUsername(responseUsername);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className="">
      <div className="auth-container">
        <Button
          label="Sign In"
          onClick={() => setSwitch(true)}
          className={`auth-button ${_switch ? 'active' : ''}`}
        />
        <Button
          label="Sign Up"
          onClick={() => setSwitch(false)}
          className={`auth-button ${!_switch ? 'active' : ''}`}
        />
      </div>
      
      <form onSubmit={handleSubmit} className="auth-form">
        {_switch ? (
          <Login
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        ) : (
          <Register
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        )}
      </form>
    </div>
  );
};

export default Authentication;
