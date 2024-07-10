import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/axiosConfig';
import './navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolder,
  faStar,
  faClock,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import Activity from '../Activity';

const SideBar = () => {
  const [selected, setSelected] = useState('home');
  const [small, setSmall] = useState(true);
  const [activities, setActivities] = useState([]);
  const [showActivities, setShowActivities] = useState(false);
  const navigate = useNavigate();

  const setPage = (pageName) => {
    setSelected(pageName);
    let path;
    switch (pageName) {
      case 'Home':
        path = '/home';
        break;
      case 'Favorites':
        path = '/favorites';
        break;
      case 'Watch Later':
        path = '/watchlater';
        break;
      default:
        path = '/';
    }
    navigate(path);
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await api.get('/api/activity/');
        setActivities(response.data.slice(0, 10));
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };
    fetchActivities();
  }, []);

  const handleMouseEnter = () => {
    setSmall(false); // Expand the sidebar on hover
    setShowActivities(true); // Show activities when the sidebar is expanded
  };

  const handleMouseLeave = () => {
    setSmall(true); // Collapse the sidebar when hover ends
    setShowActivities(false); // Hide activities when the sidebar is collapsed
  };

  return (
    <nav
      className={`sidebar ${small ? 'collapsed' : 'expanded'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ul className='nav-ul'>
        <li
          className={`side-nav-item ${selected === 'Home' ? 'selected' : ''}`}
          onClick={() => setPage('Home')}
        >
          <FontAwesomeIcon icon={faFolder} className="side-icon" />
          {!small && 'Home'}
          {!small && selected === 'Home' && <FontAwesomeIcon icon={faArrowRight} className="end-icon" />}
        </li>
        <li
          className={`side-nav-item ${selected === 'Favorites' ? 'selected' : ''}`}
          onClick={() => setPage('Favorites')}
        >
          <FontAwesomeIcon icon={faStar} className="side-icon" />
          {!small && 'Favorites'}
          {!small && selected === 'Favorites' && <FontAwesomeIcon icon={faArrowRight} className="end-icon" />}
        </li>
        <li
          className={`side-nav-item ${selected === 'Watch Later' ? 'selected' : ''}`}
          onClick={() => setPage('Watch Later')}
        >
          <FontAwesomeIcon icon={faClock} className="side-icon" />
          {!small && 'Watch Later'}
          {!small && selected === 'Watch Later' && <FontAwesomeIcon icon={faArrowRight} className="end-icon" />}
        </li>
      </ul>
      {showActivities && (
        <ul className='activity-ul'>
          {activities.map((activity, index) => (
            <Activity
              key={index}
              username={activity.user.username}
              movieTitle={activity.title.title}
              activityType={
                activity.activityType === 'favorite'
                  ? { favorite: true }
                  : { watchlater: true }
              }
              date={activity.createdAt}
            />
          ))}
        </ul>
      )}
    </nav>
  );
};

export default SideBar;
