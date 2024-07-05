// src/components/Authentication.js
import React, {useState} from 'react';

import './auth.css';

import Button from '../../components/general/Button';

import Login from './Login'
import Register from './Register'

const Authentication = ({ setIsLoggedIn, setUserUsername }) => {
  const [_switch, setSwitch] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
    </div>
  );
};

export default Authentication;
