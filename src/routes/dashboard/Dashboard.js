// src/components/Dashboard.js

import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './dashboard.css';

import Header from '../../components/navigation/Header';
import SideBar from '../../components/navigation/SideBar';
import Favorites from './Favorites';
import HomePage from './HomePage';
import WatchLater from './WatchLater';

const Dashboard = ({ userUsername, setIsLoggedIn }) => {
  console.log('Dashboard userUsername:', userUsername);
  return (
    <BrowserRouter>
      <div className="dashboard">
        <Header userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
        <div className="main-content">
          <div className='sidebar-content'>
          <SideBar />
          </div>

          <div className="content-area">
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/watchlater" element={<WatchLater />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

Dashboard.propTypes = {
  userUsername: PropTypes.string.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Dashboard;
