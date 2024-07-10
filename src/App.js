import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './App.css';
import Dashboard from './routes/dashboard/Dashboard';
import Authentication from './routes/auth/Authentication';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUsername, setUserUsername] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    console.log('AccessToken:', accessToken);

    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        console.log('DecodedToken:', decodedToken);
        setUserUsername(decodedToken.username);

        axios.post('http://localhost:8000/routes/auth/', {}, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => {
            console.log('Auth response:', response);
            setIsLoggedIn(true);
            setUserUsername(response.data.username);
          })
          .catch((error) => {
            console.error('Authentication error:', error);
            setIsLoggedIn(false);
          });
      } catch (error) {
        console.error('Invalid token specified:', error.message);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="App">
      {isLoggedIn ? <Dashboard userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} /> : <Authentication setIsLoggedIn={setIsLoggedIn} setUserUsername={setUserUsername} />}
    </div>
  );
};

export default App;
