// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Dashboard from './routes/dashboard/Dashboard';
import Authentication from './routes/auth/Authentication';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      axios.post('http://localhost:8000/routes/auth/', {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setIsLoggedIn(true);
        setUsername(response.data.username);
      })
      .catch((error) => {
        console.error('Authentication error:', error);
        setIsLoggedIn(false);
      });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="App ">
      {isLoggedIn ? <Dashboard username={username} /> : <Authentication setIsLoggedIn={setIsLoggedIn} setUserUsername={setUsername} className="auth-container" />}
    </div>
  );
};

export default App;
