// src/components/Dashboard.js
import React from 'react';
import PropTypes from 'prop-types';

import './dashboard.css';

import Header from '../../components/navigation/Header';

const Dashboard = ({ userUsername, setIsLoggedIn }) => {
  console.log('Dashboard userUsername:', userUsername);
  return (
    <div className="dashboard">
      <Header userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
};

Dashboard.propTypes = {
  userUsername: PropTypes.string,
  setIsLoggedIn: PropTypes.func,
}

export default Dashboard;
