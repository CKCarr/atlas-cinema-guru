// src/components/Authentication.js
import React, {useState} from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './auth.css';

import Button from '../../components/general/Button';

import Login from './Login'
import Register from './Register'

const Authentication = ({ setIsLoggedIn, setUserUsername }) => {

  const [_switch, setSwitch] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

  event.preventDefault();

    const endpoint = _switch ? 'http://localhost:8000/api/auth/login' : 'http://localhost:8000/api/auth/register';
    try {
      console.log('Sending request to:', endpoint);

      const response = await axios.post(endpoint, { username, password });


      const { accessToken } = response.data;
      const decodedToken = jwtDecode(accessToken);


      const responseUsername = decodedToken.username;
      console.log('Response Username:', responseUsername);

      localStorage.setItem('accessToken', accessToken);

      setUserUsername(responseUsername);
      setIsLoggedIn(true);

    } catch (error) {
      console.error('Authentication error:', error);
      setError('Authentication failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="auth-dash" >
        <div className='auth-container'>
          <div className="auth-container2">
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

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className='auth-form' >
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
    </div>

  );
};

export default Authentication;
