// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

import Dashboard from './routes/dashboard/Dashboard';
import Authentication from './routes/auth/Authentication';


import Input from './components/general/Input';
import SelectInput from './components/general/SelectInput';
import Button from './components/general/Button';
import SearchBar from './components/general/SearchBar';

import Login from './routes/auth/Login'
import Register from './routes/auth/Register'



const App = () => {
  const [username, setUsername] = useState();
  const [userUsername, setUserUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [selectedOption, setSelectedOption] = useState('');
  const [searchTitle, setSearchTitle] = useState('');

  const options = [
    { value: 'Default', label: 'Default' },
    { value: 'Latest', label: 'Latest' },
    { value: 'Oldest', label: 'Oldest' },
    { value: 'Highest Rated', label: 'Highest Rated' },
    { value: 'Lowest rated', label: 'Lowest rated' },
  ];

    useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      axios.post('/api/auth/', {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setIsLoggedIn(true);
        setUserUsername(response.data.userUsername);
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
    <div className="App">

      <h1>Cinema Guru</h1>

      {isLoggedIn ? <Dashboard /> : <Authentication />}
      <Login/>
      <Register/>


      <Input
        label="Username:"
        type="text"
        value={userUsername}
        setValue={setUserUsername}
        inputAttributes={{}}
      />
      <Input
      label="Password:"
      type="text"
      value={userUsername}
      setValue={setUserUsername}
      inputAttributes={{
        placeholder: 'Enter your password',
        type: 'password',
      }}
      />
      <SelectInput
        label="Sort:"
        options={options}
        value={selectedOption}
        setValue={setSelectedOption}
      />
      <SelectInput
        label="Min Date:"
        options={options}
        value={selectedOption}
        setValue={setSelectedOption}
      />
      <SelectInput
        label="Max Date:"
        options={options}
        value={selectedOption}
        setValue={setSelectedOption}
      />
      <p>Username: {userUsername}</p>
      <p>Selected Option: {selectedOption}</p>
      <Button
      label='Button'
      onClick={() => console.log('Button clicked')}
      icon={null}
      />
      <SearchBar
      title={searchTitle}
      setTitle={setSearchTitle}
      />
    </div>
  );
};

export default App;
