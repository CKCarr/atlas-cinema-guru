// src/components/Dashboard.js
import React from 'react';
import '../../tailwind.css';
import Input from '../../components/general/Input';
import Button from '../../components/general/Button';

const Dashboard = () => {
  return (
    <div className="dashboard">
        <Button />
        <Button />
      <h2 className="text-center" >Welcome to the Dashboard</h2>
      <Input />
      <Input />
    </div>
  );
};

export default Dashboard;
