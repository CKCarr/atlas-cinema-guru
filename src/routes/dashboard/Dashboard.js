// src/components/Dashboard.js
import React from 'react';
import PropTypes from 'prop-types';
import SideBar from '../../components/navigation/SideBar';
import './dashboard.css';

import Header from '../../components/navigation/Header';

const Dashboard = ({ userUsername, setIsLoggedIn }) => {
  console.log('Dashboard userUsername:', userUsername);
  return (
    <div className="dashboard">
      <Header userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
      <div className="main-content">
        <SideBar />
        <div className="content">
        {/** will add favorites or watch later here as switch from SideBar? */}
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  userUsername: PropTypes.string.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
}

export default Dashboard;
