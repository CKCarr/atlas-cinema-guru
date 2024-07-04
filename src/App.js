// src/App.js
import React, { useState } from 'react';
import './App.css';

import Input from './components/general/Input';
import SelectInput from './components/general/SelectInput';
import Button from './components/general/Button';
import SearchBar from './components/general/SearchBar';



const App = () => {
  const [username, setUsername] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [searchTitle, setSearchTitle] = useState('');

  const options = [
    { value: 'Default', label: 'Default' },
    { value: 'Latest', label: 'Latest' },
    { value: 'Oldest', label: 'Oldest' },
    { value: 'Highest Rated', label: 'Highest Rated' },
    { value: 'Lowest rated', label: 'Lowest rated' },
  ];

  return (
    <div className="App">

      <h1>Cinema Guru</h1>
      <Input
        label="Username:"
        type="text"
        value={username}
        setValue={setUsername}
        inputAttributes={{}}
      />
      <Input
      label="Password:"
      type="text"
      value={username}
      setValue={setUsername}
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
      <p>Username: {username}</p>
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
