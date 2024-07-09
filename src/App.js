// src/App.js

import WireframeWrapper from './utils/WireframeWrapper';
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
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      setUserUsername(decodedToken.username);

      axios.post('http://localhost:8000/routes/auth/', {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setIsLoggedIn(true);
        setUserUsername(response.data.username);
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
    <WireframeWrapper>
        <div className="App">
          {isLoggedIn ? <Dashboard userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} /> : <Authentication setIsLoggedIn={setIsLoggedIn} setUserUsername={setUserUsername} />}
        </div>
      </WireframeWrapper>
  );
};

export default App;


/** TESTING WIFEFRAME-WRAPPER */
// -----------------------------------------------
// with

    // <WireframeWrapper>
    //   <div className="App">
    //     {isLoggedIn ? <Dashboard userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} /> : <Authentication setIsLoggedIn={setIsLoggedIn} setUserUsername={setUserUsername} />}
    //   </div>
    // </WireframeWrapper>

// -----------------------------------------------
// without

    //   <div className="App">
    //     {isLoggedIn ? <Dashboard userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} /> : <Authentication setIsLoggedIn={setIsLoggedIn} setUserUsername={setUserUsername} />}
    //   </div>
