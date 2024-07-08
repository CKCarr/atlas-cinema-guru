// src/components/Activity.js

import React from 'react';
import PropTypes from 'prop-types';
import './components.css';

const Activity = ({
    username = 'User',
    movieTitle = 'Title',
    activityType = { favorite: false, watchlater: false },
    date = 'Date',
}) => {

    const formattedDate = new Date(date).toLocaleDateString('en-us', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const activity = activityType.favorite ? 'favorite' : 'watch later'

  return (
    <div className='activity-dash'>
      <h3 className='activity-title'>Latest Activities </h3>
      <li className='activity-list'>
        <p className='activity-info'>
          <span className='highlight'>{username}</span> added 
          <span className='highlight'> {movieTitle} </span> to {activity} - {formattedDate}
        </p>
      </li>
    </div>
  );
};

Activity.propTypes = {
    user: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    activityType: PropTypes.shape({
        favorite: PropTypes.bool,
        watchlater: PropTypes.bool,
    }).isRequired,
    date: PropTypes.string.isRequired,
};

export default Activity;
